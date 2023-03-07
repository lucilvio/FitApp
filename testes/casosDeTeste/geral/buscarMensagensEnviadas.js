const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const mensagem = require('../../funcoes/mensagem');

it('Deve ver as mensagens enviadas', async () => {
    const tokenAdmin = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idMensagem = await mensagem.enviarMensagem(tokenAdmin, "nutri@fitapp.com", "Boas Vindas", "Olá, Estamos felizes por tê-lo conosco!");

    await spec()
        .get(`${configuracoes.urlDaApi}/mensagem/enviadas`)
        .withHeaders("Authorization", "Bearer " + tokenAdmin)
        .expectJsonLike([{idMensagem: idMensagem}])
        .expectStatus(200);
});