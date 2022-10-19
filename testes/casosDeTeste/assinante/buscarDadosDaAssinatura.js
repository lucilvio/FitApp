const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 04 - O Assinante deve ver os dados da Assinatura', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/assinaturas/idAssinatura`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectStatus(200);

});

it('CU-AS 04 - O Assinante não vê os dados da Assinatura quando o Id da assinatura não existe', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/assinaturas/idAssinatura123`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectJson({ erro: "Assinatura não encontrada" })
        .expectStatus(404);

});

