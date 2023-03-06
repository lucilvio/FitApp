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

async function alterarImagem(req, res) {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'endpoint para alterar a imagem.'
    // #swagger.security = [] 
    
    const tipoDaImagem = req.files.imagem.name.split('.').pop();

    Usuario.validarAlteracaoDaImagem(req.files, tipoDaImagem);

    const nomeDaImagem = `${req.usuario.nome}-${req.usuario.idUsuario}.${tipoDaImagem}`;
    

    fs.writeFile("imagens/imagem-perfil/" + nomeDaImagem, req.files.imagem.data, async (err) => {
        if (err) {
            res.status(400).send({ erro: "Erro ao gravar a imagem. Tente novamente." });
        }

        await repositorioDeUsuarios.salvarImagemDoUsuario(req.usuario.idUsuario, nomeDaImagem);

        res.send({
            imagem: servicoDeArquivosEstaticos.construirCaminhoParaImagem(nomeDaImagem)
        });
    });
}

module.exports = {
    alterarSenha: alterarSenha,
    alterarImagem: alterarImagem
}