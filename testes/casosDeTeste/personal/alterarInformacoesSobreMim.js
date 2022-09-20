const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 04 - O personal deve alterar as informacoes Sobre Mim', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .patch(`http://localhost:3000/personal/idPersonal/sobreMim`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "texto": "Informações sobre o Personal",
            
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personal/idPersonal`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                "sobreMim": "Informações sobre o Personal",
            }
        )
        .expectStatus(200);

})