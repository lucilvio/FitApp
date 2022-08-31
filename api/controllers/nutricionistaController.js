
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios.js');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas.js');
const servicoDeEmail = require('../servicos/servicoDeEmail.js');
const servicoDeMensagens = require('../servicos/servicoDeMensagens.js');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');



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
        id: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.email,
        senha: geradorDeSenha.generate({
            length: 10,
            numbers: true
        }),
        bloqueado: true,
        perfil: 'nutricionista',
        mensagens: []
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutricionistaPorEmail(req.body.email);

    if (!nutriEncontrado) {

        repositorioDeUsuarios.salvarDadosDoUsuario(novoUsuario);

        let novoNutricionista = {
            id: crypto.randomUUID(),
            usuario: novoUsuario,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            registroProfissional: req.body.registroProfissional
        }

        repositorioDeNutricionistas.salvarDadosDoNutri(novoNutricionista);

        servicoDeEmail.enviar(novoNutricionista.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoNutricionista.nome, novoUsuario.senha));

        res.send({
            IdUsuario: novoUsuario.id,
            id: novoNutricionista.id
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

function buscarNutricionistas(req, res) {
    const nome = req.query.nome;
    let nutricionistas = repositorioDeNutricionistas.buscarNutricionistasPorFiltro(nome);


    res.send(nutricionistas.map(function (nutri) {
        return {
            id: nutri.id,
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
        nome: nutriEncontrado.nome,
        email: nutriEncontrado.email,
        telefone: nutriEncontrado.telefone,
        registro: nutriEncontrado.registroProfissional,
        status: nutriEncontrado.usuario.bloqueado
    });
}

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



module.exports = {
    cadastrarNutricionista: cadastrarNutricionista,
    buscarNutricionistas: buscarNutricionistas,
    buscarNutriPorId: buscarNutriPorId,
    alterarDadosDoNutricionista: alterarDadosDoNutricionista
}



