const crypto = require('crypto');

function Mensagem (idUsuarioRemetente, emailRemetente, idUsuarioDestinatario, emailDestinatario, assunto, texto) {

    if (!idUsuarioRemetente) {
        throw { mensagem: "Não é possível enviar mensagem sem remetente", interna: true };
    }

    if (!emailRemetente) {
        throw { mensagem: "Não é possível enviar mensagem sem remetente", interna: true };
    }

    if (!idUsuarioDestinatario) {
        throw { mensagem: "Não é possível enviar mensagem sem destinatario", interna: true };
    }

    if (!emailDestinatario) {
        throw { mensagem: "Não é possível enviar mensagem sem destinatario", interna: true };
    }

    if (!assunto) {
        throw { mensagem: "Não é possível enviar mensagem sem assunto", interna: true };
    }

    if (!texto) {
        throw { mensagem: "Não é possível enviar mensagem sem texto", interna: true };
    }

    this.data = new Date();
    this.idMensagem = crypto.randomUUID();
    this.idMensagemResposta = null;
    this.idUsuarioRemetente = idUsuarioRemetente;
    this.emailRemetente = emailRemetente;
    this.idUsuarioDestinatario = idUsuarioDestinatario;
    this.emailDestinatario = emailDestinatario;
    this.assunto = assunto;
    this.texto = texto;
    this.excluidaRemetente = false;
    this.excluidaDestinatario = false;
}

module.exports = {
    Mensagem: Mensagem
}

