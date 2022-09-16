const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const geradorDeSenha = require('generate-password');

function redefinirSenha(req, res) {
    if(!req.body.email) {
        res.status(400).send({ erro: "Não é possível redefinir senha sem e-mail"});
        return;
    }

    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(req.body.email);
    if(!usuarioEncontrado || usuarioEncontrado.perfil == "administrador") {
        res.status(404).send({ erro: "Não encontrado"});
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
    redefinirSenha: redefinirSenha,
}