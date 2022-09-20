
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');


// O Administrador cadastra um Nutricionista
function cadastrarNutricionista(req, res) {
    if(!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem o nome"});
        return;
    }
    if(!req.body.email) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem e-mail"});
        return;
    }
    if(!req.body.telefone) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem telefone"});
        return;
    }
    if(!req.body.registroProfissional) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem o Registro Profissional"});
        return;
    }

    let novoUsuario = {
        idUsuario: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.email,
        senha: geradorDeSenha.generate({
            length: 10,
            numbers: true
        }),
        bloqueado: false,
        perfil: 'nutricionista',
        imagem: ''
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutricionistaPorEmail(req.body.email);

    if (!nutriEncontrado) {

        repositorioDeUsuarios.salvarDadosDoUsuario(novoUsuario);

        let novoNutricionista = {
            idNutri: crypto.randomUUID(),
            usuario: novoUsuario,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            registroProfissional: req.body.registroProfissional,
            sobreMim: ''
        }

        repositorioDeNutricionistas.salvarDadosDoNutri(novoNutricionista);

        servicoDeEmail.enviar(novoNutricionista.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoNutricionista.nome, novoUsuario.senha));

        res.send({
            IdUsuario: novoUsuario.idUsuario,
            idNutri: novoNutricionista.idNutri,
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

// o Administrador busca por Nutricionistas - todos ou por nome
function buscarNutricionistas(req, res) {
    let nutricionistas = repositorioDeNutricionistas.buscarNutricionistasPorFiltro(req.query.nome);
    

    res.send(nutricionistas.map(function (nutri) {
        return {
            idNutri: nutri.idNutri,
            nome: nutri.nome,
            email: nutri.email,
            telefone: nutri.telefone,
            registro: nutri.registro,
            status: nutri.usuario.bloqueado
        }
    }));


}

function buscarNutriPorId(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    res.send({
        idNutri: nutriEncontrado.idNutri,
        nome: nutriEncontrado.nome,
        email: nutriEncontrado.email,
        telefone: nutriEncontrado.telefone,
        registro: nutriEncontrado.registroProfissional,
        status: nutriEncontrado.usuario.bloqueado,
        imagem: nutriEncontrado.usuario.imagem,
        sobreMim: nutriEncontrado.sobreMim
    });
}

// O Administrador altera os dados cadastrais do Nutricionista
function alterarDadosDoNutricionista(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const novoNome = req.body.nome;
    const novoEmail = req.body.email;
    const novoTelefone = req.body.telefone;
    const novoRegistro = req.body.registroProfissional;
    const novoStatus = req.body.bloqueado;

    if (novoNome != undefined && novoNome != null && novoNome != "") {
        nutriEncontrado.nome = novoNome;
        nutriEncontrado.usuario.nome = novoNome;
    }

    if(novoEmail != undefined && novoEmail != null && novoEmail != "" ) {
        nutriEncontrado.email = novoEmail;
        nutriEncontrado.usuario.login = novoEmail;
    }

    if(novoTelefone != undefined && novoTelefone != null && novoTelefone != "") {
        nutriEncontrado.telefone = novoTelefone;
    } 

    if(novoRegistro != undefined && novoRegistro != null && novoRegistro != "") {
        nutriEncontrado.registroProfissional = novoRegistro;
    }

    if (typeof (novoStatus) == 'boolean') {
        nutriEncontrado.bloqueado = novoStatus;
        nutriEncontrado.usuario.bloqueado = novoStatus;
    }

    res.send(nutriEncontrado);

}

// O Nutricionista altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);
    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if(req.usuario.idUsuario != nutriEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado"});
        return;
    }


    const novaImagem = req.body.imagem;
    const novoTelefone = req.body.telefone;

    if (novaImagem != undefined && novaImagem != null && novaImagem != "") {
        nutriEncontrado.usuario.imagem = novaImagem;
    }

    if(novoTelefone != undefined && novoTelefone != null && novoTelefone != '') {
        nutriEncontrado.telefone = novoTelefone;
    }

    res.send(nutriEncontrado);
}

// O nutricionista altera a senha
function alterarSenha(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if(req.usuario.idUsuario != nutriEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado"});
        return;
    }

    const novaSenha = req.body.senha;

    if(novaSenha != undefined && novaSenha != null && novaSenha != '') {
        nutriEncontrado.usuario.senha = novaSenha;
    }

    res.send(nutriEncontrado.usuario)
}

// O Nutricionista altera informações "sobre mim"
function alterarInformacoesSobreMim(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if(req.usuario.idUsuario != nutriEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado"});
        return;
    }
    nutriEncontrado.sobreMim = req.body.texto;

    res.send(nutriEncontrado)
}

// O nutricionista busca seus pacientes
function buscarPacientes(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const pacientes = repositorioDeNutricionistas.buscarPacientesPorFiltro(req.query.nome, req.params.id);

    res.send(pacientes.map(function (paciente) {
        return {
            idAssinante: paciente.idAssinante,
            nome: paciente.nome,
            objetivo: '',
            dieta: '',
            periodo: ''
        }
    }));
}

//O Nutricionista ver dados do Paciente
function buscarPacientePorId(req, res) {
    const pacienteEncontrado = repositorioDeNutricionistas.buscarPacientePorId(req.params.idAssinante);

    if (!pacienteEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    res.send({
        nome: pacienteEncontrado.nome,
        objetivo: pacienteEncontrado.objetivo,
        dataNascimento: pacienteEncontrado.dataNascimento,
        sexo: pacienteEncontrado.sexo,
        altura: pacienteEncontrado.altura,
        medidas: pacienteEncontrado.medidas,
        dietas: pacienteEncontrado.dietas

    });

}



module.exports = {
    cadastrarNutricionista: cadastrarNutricionista,
    buscarNutricionistas: buscarNutricionistas,
    buscarNutriPorId: buscarNutriPorId,
    alterarDadosDoNutricionista: alterarDadosDoNutricionista,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    alterarInformacoesSobreMim: alterarInformacoesSobreMim,
    buscarPacientes: buscarPacientes,
    buscarPacientePorId: buscarPacientePorId
}


