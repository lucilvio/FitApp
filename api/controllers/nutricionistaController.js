
const base = require('../dados.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


function cadastrarNutricionista(req, res) {
    const token = req.headers.authorization.replace("Bearer ", "");
  
    try{
        const usuario = jwt.verify(token, 'shhhhh');
    } catch(erro) {
        res.status(401).send({ erro: "Erro na validação do Token."})
    }

    if (usuario.perfil !== "administrador") {
        res.status(401).send({erro: "Erro: Acesso não autorizado."});
        return;
    }


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



    base.dados.usuarios.push({ id: novoUsuario.id, nome: novoUsuario.nome, login: novoUsuario.login, senha: novoUsuario.senha, bloqueado: novoUsuario.bloqueado, perfil: novoUsuario.perfil, mensagens: novoUsuario.mensagens });

    base.dados.nutricionistas.push({ id: novoNutricionista.id, idUsuario: novoNutricionista.idUsuario, nome: novoNutricionista.nome, login: novoNutricionista.login, telefone: novoNutricionista.telefone, registroProfissional: novoNutricionista.registroProfissional })


    res.send(base.dados.nutricionistas);

}

function buscarNutricionistas(req, res) {
    const nome = req.query.nome;
    const nutricionistas = base.dados.nutricionistas;

    res.send(nutricionistas)
}



module.exports = {
    cadastrarNutricionista: cadastrarNutricionista,
    buscarNutricionistas: buscarNutricionistas
}



