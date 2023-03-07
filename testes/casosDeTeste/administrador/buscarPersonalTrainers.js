const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const crypto = require('crypto');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');

it('CU-A 10 - deve listar Personal Trainers', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPersonal = await personalTrainer.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "55 555 55 55", "CRN 123");

    await spec()
        .get(`${configuracoes.urlDaApi}/admin/personalTrainers`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike([
            {
                idPersonal: idPersonal
            }
        ])
        .expectStatus(200);
});
