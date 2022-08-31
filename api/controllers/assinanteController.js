const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes.js');
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios.js');
const crypto = require('crypto');

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
        perfil: 'assinante',
        mensagens: []
    }

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssianantePorEmail(req.body.email);

    if (!assinanteEncontrado) {

        repositorioDeUsuarios.salvarDadosDoUsuario(novoUsuario);
        //falta o restante dos dados
        let novoAssinante = {
            id: crypto.randomUUID(),
            usuario: novoUsuario,
            nome: req.body.nome,
            email: req.body.email,
            assinatura: {
                id: "",
                idPlano: "",
                validaAte: "",
            }

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

module.exports = {
    cadastrarAssinante: cadastrarAssinante,
}