const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 04 - O Assinante deve ver os dados do plano', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/plano`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idPlano: "idPlano"
            }
        )
        .expectStatus(200);

});

