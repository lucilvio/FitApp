
const base = require('../dados.js');

const crypto = require('crypto');


function cadastrarNutricionista(req, res) {

    let novoUsuario = {
        id: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.login,
        senha: "123456",
        bloqueado: true,
        perfil: 'nutricionista',
        mensagens: []
    }

    if (!novoUsuario.login) {
        res.status(400).send({ erro: "Não é possível cadastrar usuário sem email" });
        return;
    }

    if (base.dados.usuarios.find(usuario => usuario.login == novoUsuario.login)) {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
        return;
    }

    let novoNutricionista = {
        id: crypto.randomUUID(),
        usuario: novoUsuario,
        nome: req.body.nome,
        login: req.body.login,
        telefone: req.body.telefone,
        registroProfissional: req.body.registroProfissional
    }



    base.dados.usuarios.push(novoUsuario);
    base.dados.nutricionistas.push(novoNutricionista);


    res.send(base.dados.nutricionistas);

}

function buscarNutricionistas(req, res) {
    const nome = req.query.nome;
    const nutricionistas = base.dados.nutricionistas;

    if(!nome) {
        res.send(base.dados.nutricionistas);
    }

    const nutriEcontrada = nutricionistas.find(nutricionista => nutricionista.nome == nome);

    if(!nutriEcontrada) {
        res.status(400).send({ erro: "Não encontrado"});
        return;
    }

    res.send(nutriEcontrada);

   
}



module.exports = {
    cadastrarNutricionista: cadastrarNutricionista,
    buscarNutricionistas: buscarNutricionistas
}



