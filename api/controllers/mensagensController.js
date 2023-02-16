const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDeMensagem = require('../repositorios/repositorioDeMensagens');
const Mensagem = require('../model/mensagem');


function enviarMensagem(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para enviar mensagem.'

    const remetenteEncontrado = repositorioDeUsuarios.buscarDadosDoUsuarioPorId(req.usuario.idUsuario);
    if (!remetenteEncontrado) {
        res.status(404).send({ erro: "Remetente não encontrado" });
        return;
    }

    const destinatarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(req.body.destinatario);
    if (!destinatarioEncontrado) {
        res.status(404).send({ erro: "Destinatario não encontrado" });
        return;
    }

    const mensagem = new Mensagem(remetenteEncontrado.idUsuario, remetenteEncontrado.login, destinatarioEncontrado.idUsuario,destinatarioEncontrado.login,  req.body.assunto, req.body.texto);
    repositorioDeMensagem.salvarMensagem(mensagem);

    res.send({idMensagem: mensagem.idMensagem})

}

function buscarMensagensRecebidas(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para buscar mensagens recebidas.'

    const mensagens = repositorioDeMensagem.buscarMensagensRecebidas(req.usuario.idUsuario);

    res.send(mensagens.map(function (mensagem) {
        return {
            idMensagem: mensagem.idMensagem,
            remetente: mensagem.emailRemetente,
            data: mensagem.data,
            assunto: mensagem.assunto,
            texto: mensagem.texto
        }
    }))
}

function buscarMensagensEnviadas(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para buscar mensagens enviadas.'

    const mensagens = repositorioDeMensagem.buscarMensagensEnviadas(req.usuario.idUsuario);

    res.send(mensagens.map(function (mensagem) {
        return {
            idMensagem: mensagem.idMensagem,
            remetente: mensagem.emailRemetente,
            destinatario: mensagem.emailDestinatario,
            data: mensagem.data,
            assunto: mensagem.assunto,
            texto: mensagem.texto
        }
    }))
}
function buscarMensagensExcluidas(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para buscar mensagens excluídas.'

    const mensagens = repositorioDeMensagem.buscarMensagensExcluidas(req.usuario.idUsuario);

    res.send(mensagens.map(function (mensagem) {
        return {
            idMensagem: mensagem.idMensagem,
            remetente: mensagem.emailRemetente,
            data: mensagem.data,
            assunto: mensagem.assunto,
            texto: mensagem.texto
        }
    }))
}

function buscarMensagemPorId(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para buscar mensagem por Id.'

    if (!req.params.idMensagem) {
        res.status(400).send({ erro: "Não é possível buscar mensagem sem Id" });
        return;
    }

    let mensagem = repositorioDeMensagem.buscarMensagemPorId(req.usuario.idUsuario, req.params.idMensagem);
    if (!mensagem) {
        res.status(404).send({ erro: "Mensagem não encontrada" });
        return;
    }

    res.send({
        idMensagem: mensagem.idMensagem,
        remetente: mensagem.emailRemetente,
        destinatario: mensagem.emailDestinatario,
        data: mensagem.data,
        assunto: mensagem.assunto,
        texto: mensagem.texto
    })
}

function excluirMensagem(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para excluir mensagem.'

    if (!req.params.idMensagem) {
        res.status(400).send({ erro: "Não é possível excluir mensagem sem o id da mensagem" });
        return;
    }

    repositorioDeMensagem.excluirMensagem(req.usuario.idUsuario, req.params.idMensagem)
    res.send();

}

function responderMensagem(req, res) {
    // #swagger.tags = ['Mensagem']
    // #swagger.description = 'endpoint para responder mensagem.'

    if (!req.params.idMensagem) {
        res.status(400).send({ erro: "Não é possível responder mensagem sem o id da mensagem" });
        return;
    }

    const mensagem = repositorioDeMensagem.buscarMensagemPorId(req.usuario.idUsuario, req.params.idMensagem);

    if (!mensagem) {
        res.status(404).send({ erro: "Mensagem não encontrada" });
        return;
    }

    const resposta = new Mensagem (req.usuario.idUsuario, req.usuario.email, mensagem.idUsuarioRemetente,mensagem.emailRemetente, mensagem.assunto, req.body.texto);

    mensagem.idMensagemResposta = resposta.idMensagem;

    repositorioDeMensagem.salvarMensagem(mensagem);
    repositorioDeMensagem.salvarMensagem(resposta);

    res.send({idMensagemResposta: resposta.idMensagem});
}





module.exports = {
    enviarMensagem: enviarMensagem,
    buscarMensagensRecebidas: buscarMensagensRecebidas,
    buscarMensagensEnviadas: buscarMensagensEnviadas,
    buscarMensagensExcluidas: buscarMensagensExcluidas,
    buscarMensagemPorId: buscarMensagemPorId,
    excluirMensagem: excluirMensagem,
    responderMensagem: responderMensagem
}