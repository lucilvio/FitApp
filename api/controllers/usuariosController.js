const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const fs = require('fs');

function redefinirSenha(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para redefinir a senha de login.'
    // #swagger.security = [] 

    if(!req.body.senhaAtual) {
        res.status(400).send({ erro: "Não é possível redefinir senha sem a senha atual"});
        return;
    }

    if(!req.body.novaSenha) {
        res.status(400).send({ erro: "Não é possível redefinir senha a nova senha"});
        return;
    }

    const usuarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(req.usuario.email);
    if(!usuarioEncontrado || usuarioEncontrado.perfil == "administrador") {
        res.status(404).send({ erro: "Usuário não encontrado"});
        return;
    }

    usuarioEncontrado.senha = req.body.novaSenha;

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