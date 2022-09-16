const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-A 08 - deve alterar os dados do Nutricionista', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    await spec()
        .patch(`http://localhost:3000/nutricionista/${idNutri}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana55@fitapp.com`,
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123",
            "bloqueado": true
        })
        .expectStatus(200);
})