const base = require('../dados.js');
const jwt = require('jsonwebtoken');


function login(req, res) {
    const login = req.body.email;
    const senha = req.body.senha;

    const usuarioEncontrado = base.dados.usuarios.find(usuario => usuario.login == login && usuario.senha == senha);

    if (!usuarioEncontrado) {
        res.status(400).send("login ou senha incorreto");
        return;
    }

    var token = jwt.sign({ usuarioId: usuarioEncontrado.id, nome: usuarioEncontrado.nome, perfil: usuarioEncontrado.perfil }, 'shhhhh', { expiresIn: 60 * 60 });
    res.send({token});

}


exports.login = login;