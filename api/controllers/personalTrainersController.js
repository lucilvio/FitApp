const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDePersonal = require('../repositorios/repositorioDePersonal');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');


// O Administrador cadastra um Personal Trainer
function cadastrarPersonal(req, res) {
    if(!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem o nome"});
        return;
    }
    if(!req.body.email) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem e-mail"});
        return;
    }
    if(!req.body.telefone) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem telefone"});
        return;
    }
    if(!req.body.registroProfissional) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem o Registro Profissional"});
        return;
    }

    const personalEncontrado = repositorioDePersonal.buscarPersonalPorEmail(req.body.email);

    if (!personalEncontrado) {

        const novoUsuario = repositorioDeUsuarios.criarUsuario(req.body.nome, req.body.email, 'personalTrainer');

        const novoPersonalTrainer =  repositorioDePersonal.criarPersonal(novoUsuario, req.body.telefone, req.body.registroProfissional);

        servicoDeEmail.enviar(novoPersonalTrainer.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoPersonalTrainer.nome, novoUsuario.senha));

        res.send({
            IdUsuario: novoUsuario.idUsuario,
            idPersonal: novoPersonalTrainer.idPersonal,
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

// o Administrador busca por Personal Trainers - todos ou por nome
function buscarPersonal(req, res) {
    let personalTrainers = repositorioDePersonal.buscarPersonalPorFiltro(req.query.nome);

    res.send(personalTrainers.map(function (personal) {
        return {
            idPersonal: personal.idPersonal,
            nome: personal.nome,
            email: personal.email,
            telefone: personal.telefone,
            registro: personal.registro,
            status: personal.usuario.bloqueado
        }
    }));


}

function buscarPersonalPorId(req, res) {
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    res.send({
        idPersonal: personalEncontrado.idPersonal,
        nome: personalEncontrado.nome,
        email: personalEncontrado.email,
        telefone: personalEncontrado.telefone,
        registro: personalEncontrado.registroProfissional,
        status: personalEncontrado.usuario.bloqueado,
        imagem: personalEncontrado.usuario.imagem,
        sobreMim: personalEncontrado.sobreMim
    });
}


// O Administrador altera os dados cadastrais do Personal Trainer
function alterarDadosDoPersonal(req, res) {
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const novoNome = req.body.nome;
    const novoEmail = req.body.email;
    const novoTelefone = req.body.telefone;
    const novoRegistro = req.body.registroProfissional;
    const novoStatus = req.body.bloqueado;

    if (novoNome != undefined && novoNome != null && novoNome != "") {
        personalEncontrado.nome = novoNome;
        personalEncontrado.usuario.nome = novoNome;
    }

    if(novoEmail != undefined && novoEmail != null && novoEmail != "" ) {
        personalEncontrado.email = novoEmail;
        personalEncontrado.usuario.login = novoEmail;
    }

    if(novoTelefone != undefined && novoTelefone != null && novoTelefone != "") {
        personalEncontrado.telefone = novoTelefone;
    } 

    if(novoRegistro != undefined && novoRegistro != null && novoRegistro != "") {
        personalEncontrado.registroProfissional = novoRegistro;
    }

    if (typeof (novoStatus) == 'boolean') {
        personalEncontrado.bloqueado = novoStatus;
        personalEncontrado.usuario.bloqueado = novoStatus;
    }


    res.send(personalEncontrado);
}

// O Personal altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.params.id);
    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if(req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado"});
        return;
    }


    const novaImagem = req.body.imagem;
    const novoTelefone = req.body.telefone;

    if (novaImagem != undefined && novaImagem != null && novaImagem != "") {
        personalEncontrado.usuario.imagem = novaImagem;
    }

    if(novoTelefone != undefined && novoTelefone != null && novoTelefone != '') {
        personalEncontrado.telefone = novoTelefone;
    }

    res.send(personalEncontrado);
}

// O Personal altera a senha
function alterarSenha(req, res) {
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if(req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado"});
        return;
    }

    const novaSenha = req.body.senha;

    if(novaSenha != undefined && novaSenha != null && novaSenha != '') {
        personalEncontrado.usuario.senha = novaSenha;
    }

    res.send(personalEncontrado.usuario)
}

// O Personal altera informações "sobre mim"
function alterarInformacoesSobreMim(req, res) {
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if(req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado"});
        return;
    }
    personalEncontrado.sobreMim = req.body.texto;

    res.send(personalEncontrado)
}

// O Personal busca seus Alunos
function buscarAlunos(req, res) {
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const alunos = repositorioDePersonal.buscarAlunosPorFiltro(req.query.nome, req.params.id);

    res.send(alunos.map(function (aluno) {
        return {
            idAssinante: aluno.idAssinante,
            nome: aluno.nome,
            objetivo: '',
            dieta: '',
            periodo: ''
        }
    }));
}



module.exports = {
    cadastrarPersonal: cadastrarPersonal,
    buscarPersonal: buscarPersonal,
    buscarPersonalPorId: buscarPersonalPorId,
    alterarDadosDoPersonal: alterarDadosDoPersonal,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    alterarInformacoesSobreMim: alterarInformacoesSobreMim,
    buscarAlunos : buscarAlunos
}