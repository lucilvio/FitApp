const { spec } = require('pactum');

async function enviarMensagem(token, destinatario, assunto, texto) {
    return await spec()
    .post('http://localhost:3000/mensagem')
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
