const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const jwt = require('jsonwebtoken');


function login(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para fazer login.'
    // #swagger.security = [] 

    const login = req.body.email;
    const senha = req.body.senha;

    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(login);

    if (!usuarioEncontrado) {
        res.status(400).send({ erro: "login ou senha incorreto" });
        return;
    }

    if (usuarioEncontrado.bloqueado == true) {
        res.status(400).send({ erro: "Usuário bloqueado" });
        return;
    }

    if (usuarioEncontrado.senha !== senha) {
        res.status(400).send({ erro: "login ou senha incorreto" });
        return;
    }

    var token = jwt.sign(
        {
            idUsuario: usuarioEncontrado.idUsuario,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.login,
            perfil: usuarioEncontrado.perfil,
            imagem: usuarioEncontrado.imagem
        }, 'shhhhh', { expiresIn: 30 });

    res.send({token});

}

module.exports = {
    login: login
}

