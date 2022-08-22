const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios.js');
const jwt = require('jsonwebtoken');


function login(req, res) {
    const login = req.body.email;
    const senha = req.body.senha;

    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(login);

    if (!usuarioEncontrado) {
        res.status(400).send("login ou senha incorreto");
        return;
    }

    if(usuarioEncontrado.bloqueado == true) {
        res.status(400).send("login ou senha incorreto");
        return;
    }

    if(usuarioEncontrado.senha !== senha) {
        res.status(400).send("login ou senha incorreto");
        return;
    }

    var token = jwt.sign({ usuarioId: usuarioEncontrado.id, nome: usuarioEncontrado.nome, perfil: usuarioEncontrado.perfil }, 'shhhhh', { expiresIn: 60 * 60 });
    res.send({token});

}

module.exports = {
    login: login
}

