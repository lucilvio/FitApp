const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const fs = require('fs');
const Usuario = require('../model/usuario');

async function alterarSenha(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para alterar a senha de login.'
    // #swagger.security = [] 

    Usuario.validarAlteracaoDeSenha(req.body.senhaAtual, req.body.novaSenha);

    const dadosDoUsuario = await repositorioDeUsuarios.buscarDadosDoUsuarioPorId(req.usuario.idUsuario);
    if(!dadosDoUsuario || dadosDoUsuario.perfil == "administrador") {
        res.status(404).send({ erro: "Usuário não encontrado"});
        return;
    }

    if(dadosDoUsuario.senha !== req.body.senhaAtual) {
        res.status(404).send({ erro: "Senha atual incorreta"});
        return;
    }

    await repositorioDeUsuarios.salvarNovaSenha(req.usuario.idUsuario, req.body.novaSenha);

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
    alterarSenha: alterarSenha,
    alterarFoto: alterarFoto
}