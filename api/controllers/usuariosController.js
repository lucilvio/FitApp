const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const geradorDeSenha = require('generate-password');
const fs = require('fs');

function redefinirSenha(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para redefinir a senha de login.'
    // #swagger.security = [] 

    if(!req.body.email) {
        res.status(400).send({ erro: "Não é possível redefinir senha sem e-mail"});
        return;
    }

    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(req.body.email);
    if(!usuarioEncontrado || usuarioEncontrado.perfil == "administrador") {
        res.status(404).send({ erro: "Usuário não encontrado"});
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

function alterarFoto(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para alterar a foto.'
    // #swagger.security = [] 

    if(!req.files) {
        res.status(400).send({ erro: "Não é possível usar uma foto vazia"});
        return;
    }

    const tipoDaFoto = req.files.foto.name.split('.').pop();
    const nomeDaFoto = `${req.usuario.nome}-${req.usuario.idUsuario}.${tipoDaFoto}`;

    fs.writeFile("imagens/foto-perfil/" + nomeDaFoto, req.files.foto.data, (err) => {
        if(err) {
            res.status(400).send({ erro: "Erro ao gravar a foto. Tente novamente."});
        }
        
        const caminhoDaFoto = "publico/foto-perfil/" + nomeDaFoto;
        repositorioDeUsuarios.salvarFotoUsuario(req.usuario.idUsuario, caminhoDaFoto);

        res.send({
            foto: caminhoDaFoto
        });
    });
}

module.exports = {
    redefinirSenha: redefinirSenha,
    alterarFoto: alterarFoto
}