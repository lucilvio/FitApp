const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-P 02 - O Personal deve alterar os dados do perfil', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    const telefone = `${crypto.randomUUID()}`;

    await spec()
        .patch(`http://localhost:3000/personalTrainer/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nome": "personal_teste",
            "telefone": telefone
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainer/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                "telefone": telefone
            }
        )
        .expectStatus(200);

})