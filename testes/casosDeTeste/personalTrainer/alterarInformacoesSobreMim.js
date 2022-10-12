const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 04 - O Personal Trainer deve alterar as informacoes Sobre Mim', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .patch(`http://localhost:3000/personalTrainer/sobreMim`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "texto": "Informações sobre o Personal Trainer",
        })
        .expectStatus(200);

        await spec()
        .get(`http://localhost:3000/personalTrainer/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                idPersonal: "idPersonal",
                sobreMim: "Informações sobre o Personal Trainer"
            }
        )
        .expectStatus(200);
})