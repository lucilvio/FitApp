const { spec } = require('pactum');
const crypto = require('crypto');
const personalTrainers = require('../../funcoes/personal');
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os Personal Trainers ativos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPersonal1 = await personalTrainers.cadastrarPersonal(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");
    const idPersonal2 = await personalTrainers.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "555555555", "CRN 555");

    await spec()
        .patch(`http://localhost:3000/admin/personalTrainers/${idPersonal2}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "bloqueado": true
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainers`)
        .expectJsonLike([
            {
               idPersonal: idPersonal1
            }
        ])
        .expectStatus(200);

        
})