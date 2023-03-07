const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const mensagem = require('../../funcoes/mensagem');

it('Deve responder Mensagem', async () => {
    const tokenAdmin = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idMensagem = await mensagem.enviarMensagem(tokenAdmin, "nutri@fitapp.com", "Boas Vindas", "Olá, Estamos felizes por tê-lo conosco!");

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .post(`${configuracoes.urlDaApi}/mensagens/${idMensagem}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "texto": "Obrigada!",
        })
        .expectStatus(200);
});

it('Não responde Mensagem quando o Id da Mensagem não existe', async () => {
    const tokenAdmin = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idMensagem = await mensagem.enviarMensagem(tokenAdmin, "nutri@fitapp.com", "Boas Vindas", "Olá, Estamos felizes por tê-lo conosco!");

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .post(`${configuracoes.urlDaApi}/mensagens/idMensagem123`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "texto": "Obrigada!",
        })
        .expectJson({ erro: "Mensagem não encontrada"})
        .expectStatus(404);
});