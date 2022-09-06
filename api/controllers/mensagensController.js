const base = require('../dados');
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDeMensagem = require('../repositorios/repositorioDeMensagens');
const crypto = require('crypto');

function enviarMensagem(req, res) {
    if (!req.body.remetente) {
        res.status(400).send({ erro: "Não é possível enviar mensagem sem remetente" });
        return;
    }

    if (!req.body.destinatario) {
        res.status(400).send({ erro: "Não é possível enviar mensagem sem destinatario" });
        return;
    }

    let novaMensagem = {
        id: crypto.randomUUID(),
        remetente: req.body.remetente,
        destinatario: req.body.destinatario,
        data: new Date(),
        assunto: req.body.assunto,
        texto: req.body.texto,
        excluida: false
    }

    const remetenteEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(req.body.remetente);
    if (!remetenteEncontrado) {
        res.status(404).send({ erro: "Remetente não encontrado" });
        return;
    }

    const destinatarioEncontrado = repositorioDeUsuarios.buscarUsuarioPorLogin(req.body.destinatario);
    if (!destinatarioEncontrado) {
        res.status(404).send({ erro: "Destinatario não encontrado" });
        return;
    }

    base.dados.mensagens.push(novaMensagem);

    res.send(base.dados.mensagens)

}

function buscarMensagensPorFiltro(req, res) {

    if (!req.query.destinatario && !req.query.remetente) {
        res.status(400).send({ erro: "Não é possível buscar mensagem sem destinatario ou remetente" })
    }

    let mensagens;

    if (req.query.destinatario) {
        mensagens = repositorioDeMensagem.buscarMensagensPorDestinatario(req.query.destinatario, req.query.excluida);
    }

    if(req.query.remetente) {
        mensagens = repositorioDeMensagem.buscarMensagensPorRemetente(req.query.remetente, req.query.excluida);
    }


    res.send(mensagens.map(function (mensagem) {
        return {
            idMensagem: mensagem.id,
            remetente: mensagem.remetente,
            data: mensagem.data,
            assunto: mensagem.assunto,
            texto: mensagem.texto
        }
    }))
}

function buscarMensagemPorId(req, res) {
    if (!req.params.idMensagem) {
        res.status(400).send({ erro: "Não é possível buscar mensagem sem Id" });
        return;
    }

    let mensagem = repositorioDeMensagem.buscarMensagemPorId(req.params.idMensagem);
    if (!mensagem) {
        res.status(404).send({ erro: "Mensagem não encontrada" });
        return;
    }

    res.send({
        remetente: mensagem.remetente,
        destinatario: mensagem.destinatario,
        data: mensagem.data,
        assunto: mensagem.assunto,
        texto: mensagem.texto
    })
}

function excluirMensagem(req, res) {
    if (!req.params.idMensagem) {
        res.status(400).send({ erro: "Não é possível excluir mensagem sem o id da mensagem" });
        return;
    }

    let mensagem = repositorioDeMensagem.buscarMensagemPorId(req.params.idMensagem);
    if (!mensagem) {
        res.status(404).send({ erro: "Mensagem não encontrada" });
    }

    mensagem.excluida = req.body.excluida;

    res.send(mensagem);

}

function responderMensagem(req, res) {
    if (!req.params.idMensagem) {
        res.status(400).send({ erro: "Não é possível responder mensagem sem o id da mensagem" });
        return;
    }

    let mensagem = repositorioDeMensagem.buscarMensagemPorId(req.params.idMensagem);
    if (!mensagem) {
        res.status(404).send({ erro: "Mensagem não encontrada" });
    }

    let novaMensagem = {
        id: crypto.randomUUID(),
        remetente: mensagem.destinatario,
        destinatario: mensagem.remetente,
        data: new Date(),
        assunto: mensagem.assunto,
        texto: req.body.texto,
        excluida: false,
    }

    base.dados.mensagens.push(novaMensagem);

    res.send(novaMensagem);


}



module.exports = {
    enviarMensagem: enviarMensagem,
    buscarMensagensPorFiltro: buscarMensagensPorFiltro,
    buscarMensagemPorId: buscarMensagemPorId,
    excluirMensagem: excluirMensagem,
    responderMensagem: responderMensagem
}