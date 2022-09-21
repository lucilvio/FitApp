
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');



// O Administrador cadastra um Nutricionista
function cadastrarNutricionista(req, res) {
    if (!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem o nome" });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem e-mail" });
        return;
    }
    if (!req.body.telefone) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem telefone" });
        return;
    }
    if (!req.body.registroProfissional) {
        res.status(400).send({ erro: "Não é possível cadastrar Nutricionista sem o Registro Profissional" });
        return;
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutricionistaPorEmail(req.body.email);

    if (!nutriEncontrado) {

        const novoUsuario = repositorioDeUsuarios.criarUsuario(req.body.nome, req.body.email, 'nutricionista');

        const novoNutricionista = repositorioDeNutricionistas.criarNutricionista(novoUsuario, req.body.telefone, req.body.registroProfissional);

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

    repositorioDeNutricionistas.salvarAlteracaoDeDados(nutriEncontrado, req.body.nome, req.body.email, req.body.telefone, req.body.registroProfissional, req.body.bloqueado);

    res.send();

}

// O Nutricionista altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutricionistaPorEmail(req.usuario.email);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    repositorioDeNutricionistas.salvarAlteracaoDoPerfil(nutriEncontrado, req.body.imagem, req.body.telefone);

    res.send();
}

// O nutricionista altera a senha
function alterarSenha(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != nutriEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado" });
        return;
    }

    repositorioDeNutricionistas.salvarNovaSenha(nutriEncontrado, req.body.senha);



    res.send();
}

// O Nutricionista altera informações "sobre mim"
function alterarInformacoesSobreMim(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.id);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != nutriEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado" });
        return;
    }

    repositorioDeNutricionistas.salvarAlteraçõesSobreMim(nutriEncontrado, req.body.texto)


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

// O Nutricionista cria dieta
function criarDieta(req, res) {
    if (!req.body.dietaNome) {
        res.status(400).send({ erro: "Não é possível criar dieta sem nome" });
        return;
    }

    if (!req.body.dataInicio) {
        res.status(400).send({ erro: "Não é possível criar dieta a data de inicio" });
        return;
    }

    if (!req.body.dataFim) {
        res.status(400).send({ erro: "Não é possível criar dieta sem a data do fim" });
        return;
    }

    if (!req.body.objetivo) {
        res.status(400).send({ erro: "Não é possível criar dieta sem o objetivo" });
        return;
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.idNutri);

    const pacienteEncontrado = repositorioDeNutricionistas.buscarPacientePorId(req.params.idAssinante);


    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    if (!pacienteEncontrado) {
        res.status(404).send({ erro: "Paciente não encontrado" });
        return;
    }

    if(req.params.idNutri == pacienteEncontrado.nutricionista) {

        const dieta = repositorioDeNutricionistas.salvarDieta(
            pacienteEncontrado,
            req.body.dietaNome,
            req.body.dataInicio,
            req.body.dataFim,
            req.body.objetivo,
            req.body.cafeDaManha,
            req.body.lancheDaManha,
            req.body.almoco,
            req.body.lancheDaTarde,
            req.body.jantar,
            req.body.ceia
        );
        res.send(dieta);
    } else {
        res.status(400).send({ erro: "Não é possivel criar dieta "})
    }



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
    buscarPacientePorId: buscarPacientePorId,
    criarDieta: criarDieta
}


