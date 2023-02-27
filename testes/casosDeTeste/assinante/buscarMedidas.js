const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const assinante = require('../../funcoes/assinante');


it('CU-AS 17 - O Assinante deve ver historico de medidas', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                medidasAtuais: {}
            }
        )
        .expectStatus(200);

    const idMedidas = await assinante.inserirMedidas(tokenAssinante, 60, 0, 0, 0);

    await spec()
        .get(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                "historicoDeMedidas": [
                    {
                        idMedidas: idMedidas
                    }
                ]
            }
        )
        .expectStatus(200);

});