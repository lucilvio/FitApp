const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const assinante = require('../../funcoes/assinante');

it('CU-AS 17 - O Assinante deve ver historico de medidas', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                historicoMedidas: []
            }
        )
        .expectStatus(200);
});