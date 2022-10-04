const { spec } = require('pactum');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os Nutricionistas ativos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri1 = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");
    const idNutri2 = await nutricionista.cadastrarNutri(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "555555555", "CRN 555");

    await spec()
        .patch(`http://localhost:3000/admin/nutricionistas/${idNutri2}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "bloqueado": true
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/nutricionistas`)
        .expectJsonLike([
            {
               idNutri: idNutri1
            }
        ])
        .expectStatus(200);

        
})