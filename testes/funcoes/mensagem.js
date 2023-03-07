const { spec } = require('pactum');
const configuracoes = require('../configuracoes');

async function enviarMensagem(token, destinatario, assunto, texto) {
    return await spec()
    .post(`${configuracoes.urlDaApi}/mensagem`)
    .withHeaders("Authorization", "Bearer " + token)
    .withJson({
        "destinatario": destinatario,
        "assunto":assunto,
        "texto": texto,
    })
    .returns("idMensagem");
}

module.exports = {
    enviarMensagem: enviarMensagem,
}
