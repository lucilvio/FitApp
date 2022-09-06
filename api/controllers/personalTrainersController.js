const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDePersonal = require('../repositorios/repositorioDePersonal');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');


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

    let novoUsuario = {
        id: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.email,
        senha: geradorDeSenha.generate({
            length: 10,
            numbers: true
        }),
        bloqueado: true,
        perfil: 'personal trainer',
        mensagens: []
    }

    const personalEncontrado = repositorioDePersonal.buscarPersonalPorEmail(req.body.email);

    if (!personalEncontrado) {

        repositorioDeUsuarios.salvarDadosDoUsuario(novoUsuario);

        let novoPersonal = {
            id: crypto.randomUUID(),
            usuario: novoUsuario,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            registroProfissional: req.body.registroProfissional
        }

        repositorioDePersonal.salvarDadosDoPersonal(novoPersonal);

        servicoDeEmail.enviar(novoPersonal.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoPersonal.nome, novoUsuario.senha));

        res.send({
            idUsuario: novoUsuario.id,
            id: novoPersonal.id
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

function buscarPersonal(req, res) {
    let personalTrainers = repositorioDePersonal.buscarPersonalPorFiltro(req.query.nome);

    res.send(personalTrainers.map(function (personal) {
        return {
            id: personal.id,
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
        nome: personalEncontrado.nome,
        email: personalEncontrado.email,
        telefone: personalEncontrado.telefone,
        registro: personalEncontrado.registroProfissional,
        status: personalEncontrado.usuario.bloqueado
    });
}

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

module.exports = {
    cadastrarPersonal: cadastrarPersonal,
    buscarPersonal: buscarPersonal,
    buscarPersonalPorId: buscarPersonalPorId,
    alterarDadosDoPersonal: alterarDadosDoPersonal
}