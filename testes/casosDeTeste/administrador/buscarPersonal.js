const { spec } = require('pactum');
const crypto = require('crypto');
const usuario = require('../../funcoes/usuario');
const personal = require('../../funcoes/personal');

it('CU-A 10 - deve listar Personal Trainers', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPersonal = await personal.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "55 555 55 55", "CRN 123");

    await spec()
        .get('http://localhost:3000/admin/personal')
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike([
            {
                idPersonal: idPersonal
            }
        ])
        .expectStatus(200);
});