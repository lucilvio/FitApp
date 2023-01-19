const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const geradorDeSenha = require('generate-password');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');


function gerarNovaSenha(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para gerar nova senha.'
    // #swagger.security = [] 

    const login = req.body.email;
    
    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(login);

    if(!usuarioEncontrado || usuarioEncontrado.perfil == "administrador") {
        res.status(404).send({ erro: "Usuário não encontrado"});
        return;
    }

    if (usuarioEncontrado.bloqueado == true) {
        res.status(400).send({ erro: "Usuário bloqueado" });
        return;
    }

    const novaSenha = geradorDeSenha.generate({
        length: 10,
        numbers: true
    });

    usuarioEncontrado.senha = novaSenha;

    servicoDeEmail.enviar(req.body.email, 'FitApp - Nova Senha', servicoDeMensagens.gerarMensagemComNovaSenha(usuarioEncontrado.nome, novaSenha));

    res.send();
}

module.exports = {
    gerarNovaSenha: gerarNovaSenha
}

