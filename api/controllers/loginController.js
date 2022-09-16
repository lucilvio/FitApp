const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const jwt = require('jsonwebtoken');


function login(req, res) {
    const login = req.body.email;
    const senha = req.body.senha;

    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(login);

    if (!usuarioEncontrado) {
        res.status(400).send({ erro: "login ou senha incorreto"});
        return;
    }

    if(usuarioEncontrado.bloqueado == true) {
        res.status(400).send({ erro: "login ou senha incorreto"});
        return;
    }

    if(usuarioEncontrado.senha !== senha) {
        res.status(400).send({ erro: "login ou senha incorreto"});
        return;
    }

    var token = jwt.sign({ idUsuario: usuarioEncontrado.id, nome: usuarioEncontrado.nome, perfil: usuarioEncontrado.perfil }, 'shhhhh', { expiresIn: 60 * 60 });
    res.send({idUsuario: usuarioEncontrado.id, token});

}

module.exports = {
    login: login
}

