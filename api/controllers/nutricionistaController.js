
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios.js');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas.js');
const crypto = require('crypto');


function cadastrarNutricionista(req, res) {

    let novoUsuario = {
        id: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.email,
        senha: "123456",
        bloqueado: true,
        perfil: 'nutricionista',
        mensagens: []
    }

    if (!novoUsuario.login) {
        res.status(400).send({ erro: "Não é possível cadastrar usuário sem email" });
        return;
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

        res.send();

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

function buscarNutricionistas(req, res) {
    const nome = req.query.nome;
    let nutricionistas = repositorioDeNutricionistas.buscarNutricionistasPorFiltro(nome);

    if (!nutricionistas) {
        nutricionistas = [];
    }

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



module.exports = {
    cadastrarNutricionista: cadastrarNutricionista,
    buscarNutricionistas: buscarNutricionistas
}



