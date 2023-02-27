const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const assinante = require('../../funcoes/assinante');

it('CU-AS 15 - O Assinante deve inserir medidas', async () => {
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    const idMedidas = await assinante.inserirMedidas(tokenAssinante, 80, 30, 71, 95);

    await spec()
        .get(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                historicoDeMedidas: [
                    {
                        idMedidas: idMedidas
                    }
                    
                ]
            }
        )
        .expectStatus(200);

});