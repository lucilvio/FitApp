const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-N 02 - O Nutricionista deve alterar os dados do perfil', async () => {
    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    const telefone = `${crypto.randomUUID()}`;

    await spec()
        .patch(`http://localhost:3000/nutricionista/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "nome": "nutricionista_teste",
            "telefone": telefone
        })
        .expectStatus(200);


    await spec()
        .get(`http://localhost:3000/nutricionista/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                "telefone": telefone
            }
        )
        .expectStatus(200);

})

