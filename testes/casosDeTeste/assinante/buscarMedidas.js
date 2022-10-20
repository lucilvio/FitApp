const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 16 - O Assinante deve ver historico de medidas', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .post(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "peso": 58,
            "pescoco": 33,
            "cintura": 71,
            "quadril": 100
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike([])
        .expectStatus(200);



});