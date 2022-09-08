const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');


function cadastrarAssinante(req, res) {
    if (!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem o nome" });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem e-mail" });
        return;
    }

    if (!req.body.idPlano) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem plano" });
        return;
    }
    if (!req.body.idNutri) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem nutricionista" });
        return;
    }
    if (!req.body.idPersonal) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem personal trainer" });
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
        bloqueado: false,
        perfil: 'assinante'
    }

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssianantePorEmail(req.body.email);

    if (!assinanteEncontrado) {

        repositorioDeUsuarios.salvarDadosDoUsuario(novoUsuario);

        let novoAssinante = {
            id: crypto.randomUUID(),
            usuario: novoUsuario,
            nome: req.body.nome,
            email: req.body.email,
            assinatura: {
                id: crypto.randomUUID(),
                idPlano: req.body.idPlano,
            },
            nutricionista: req.body.idNutri,
            personal: req.body.idPersonal

        }

        repositorioDeAssinantes.salvarDadosDoAssinante(novoAssinante);

        servicoDeEmail.enviar(novoAssinante.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoAssinante.nome, novoUsuario.senha));

        res.send({
            IdUsuario: novoUsuario.id,
            id: novoAssinante.id
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

function buscarAssinantes(req, res) {
    const assinantes = repositorioDeAssinantes.buscarAssinantePorFiltro(req.query.nome);

    res.send(assinantes.map(function (assinante) {
        return {
            id: assinante.id,
            nome: assinante.nome,
            email: assinante.email,
            status: assinante.usuario.bloqueado,
            idPlano: assinante.assinatura.idPlano
        }
    }));

}

function alterarStatusDoAssinante(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.params.id);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const novoStatus = req.body.bloqueado;

    assinanteEncontrado.usuario.bloqueado = novoStatus;

    res.send(assinanteEncontrado.usuario.bloqueado)
}

module.exports = {
    cadastrarAssinante: cadastrarAssinante,
    buscarAssinantes: buscarAssinantes,
    alterarStatusDoAssinante: alterarStatusDoAssinante,
}