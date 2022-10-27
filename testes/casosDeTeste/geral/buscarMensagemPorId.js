const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const mensagem = require('../../funcoes/mensagem');

it('Deve buscar mensagem por Id', async () => {
    const tokenAdmin = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idMensagem = await mensagem.enviarMensagem(tokenAdmin, "nutri@fitapp.com", "Boas Vindas", "Olá, Estamos felizes por tê-lo conosco!");

    await spec()
        .get(`http://localhost:3000/mensagens/${idMensagem}`)
        .withHeaders("Authorization", "Bearer " + tokenAdmin)
        .expectJsonLike({idMensagem: idMensagem})
        .expectStatus(200);

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/mensagens/${idMensagem}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike({idMensagem: idMensagem})
        .expectStatus(200);
});

it('Não busca mensagem quando o Id não existe', async () => {
    const tokenAdmin = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idMensagem = await mensagem.enviarMensagem(tokenAdmin, "nutri@fitapp.com", "Boas Vindas", "Olá, Estamos felizes por tê-lo conosco!");

    await spec()
        .get(`http://localhost:3000/mensagens/${idMensagem}`)
        .withHeaders("Authorization", "Bearer " + tokenAdmin)
        .expectJsonLike({idMensagem: idMensagem})
        .expectStatus(200);

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/mensagens/idmensagem123`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Mensagem não encontrada" })
        .expectStatus(404);
});