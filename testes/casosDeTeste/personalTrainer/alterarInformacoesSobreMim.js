const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');


it('CU-P 04 - O Personal Trainer deve alterar as informacoes Sobre Mim', async () => {
    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    const textoSobreMim = `Informações sobre a Nutri_${crypto.randomUUID()}`;

    await spec()
        .patch(`http://localhost:3000/personalTrainer/sobreMim`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "texto": textoSobreMim,
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainer/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                sobreMim: textoSobreMim
            }

        )
        .expectStatus(200);
})