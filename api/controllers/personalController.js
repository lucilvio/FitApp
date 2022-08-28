const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios.js');
const repositorioDePersonal = require('../repositorios/repositorioDePersonal.js');
const servicoDeEmail = require('../servicos/servicoDeEmail.js');
const servicoDeMensagens = require('../servicos/servicoDeMensagens.js');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');


function cadastrarPersonal(req, res) {

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

    if (!novoUsuario.login) {
        res.status(400).send({ erro: "Não é possível cadastrar usuário sem email" });
        return;
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
    const nome = req.query.nome;
    let personalTrainers = repositorioDePersonal.buscarPersonalPorFiltro(nome);

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

function alterarStatusPersonal(req, res) {
    const id = req.params.id;
    const personal = repositorioDePersonal.buscarPersonalPorId(id);

    if (!personal) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const novoStatus = req.body.bloqueado;
    personal.usuario.bloqueado = novoStatus;

    res.send(personal)
}

module.exports = {
    cadastrarPersonal: cadastrarPersonal,
    buscarPersonal: buscarPersonal,
    alterarStatusPersonal: alterarStatusPersonal
}