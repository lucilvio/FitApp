const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const fs = require('fs');
const Usuario = require('../model/usuario');
const servicoDeArquivosEstaticos = require('../servicos/servicoDeArquivosEstaticos');

async function alterarSenha(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para alterar a senha de login.'
    // #swagger.security = [] 

    Usuario.validarAlteracaoDeSenha(req.body.senhaAtual, req.body.novaSenha);

    const dadosDoUsuario = await repositorioDeUsuarios.buscarDadosDoUsuarioPorId(req.usuario.idUsuario);
    if (!dadosDoUsuario || dadosDoUsuario.perfil == "administrador") {
        res.status(404).send({ erro: "Usuário não encontrado" });
        return;
    }

    if (dadosDoUsuario.senha !== req.body.senhaAtual) {
        res.status(404).send({ erro: "Senha atual incorreta" });
        return;
    }

    await repositorioDeUsuarios.salvarNovaSenha(req.usuario.idUsuario, req.body.novaSenha);

    res.send();
}

async function alterarFoto(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para alterar a foto.'
    // #swagger.security = [] 

    Usuario.validarAlteracaoDaImagem(req.files);

    const tipoDaImagem = req.files.foto.name.split('.').pop();
    const nomeDaImagem = `${req.usuario.nome}-${req.usuario.idUsuario}.${tipoDaImagem}`;

    fs.writeFile("imagens/foto-perfil/" + nomeDaImagem, req.files.foto.data, async (err) => {
        if (err) {
            res.status(400).send({ erro: "Erro ao gravar a imagem. Tente novamente." });
        }

        await repositorioDeUsuarios.salvarImagemDoUsuario(req.usuario.idUsuario, nomeDaImagem);

        res.send({
            foto: servicoDeArquivosEstaticos.construirCaminhoParaImagem(nomeDaImagem)
        });
    });
}

module.exports = {
    alterarSenha: alterarSenha,
    alterarFoto: alterarFoto
}