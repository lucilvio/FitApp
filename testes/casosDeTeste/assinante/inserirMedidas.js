const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 15 - O Assinante deve inserir medidas', async () => {
    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .post(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "peso": 60,
            "pescoco": 30,
            "cintura": 70,
            "quadril": 100
         })
        .expectStatus(200);

});