const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios.js');
const repositorioDePersonal = require('../repositorios/repositorioDePersonal.js');
const crypto = require('crypto');


function cadastrarPersonal(req, res) {

    let novoUsuario = {
        id: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.email,
        senha: "123456",
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

        res.send();

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

module.exports = {
    cadastrarPersonal: cadastrarPersonal,
    buscarPersonal: buscarPersonal
}