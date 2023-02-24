const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-A 08 - deve alterar os dados do Nutricionista', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "crm123");

    await spec()
        .get(`http://localhost:3000/admin/nutricionistas/${idNutri}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idNutri: idNutri,
            }
        )
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/admin/nutricionistas/${idNutri}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana55@fitapp.com`,
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123",
            "bloqueado": true
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/admin/nutricionistas/${idNutri}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idNutri: idNutri,
                bloqueado: true
            }
        )
        .expectStatus(200);
})

it('CU-A 08 - não deve alterar os dados quando não encontrar o Nutricionista', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    await spec()
        .patch(`http://localhost:3000/admin/nutricionistas/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana55@fitapp.com`,
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123",
            "bloqueado": true
        })
        .expectJson({ erro: "Nutricionista não encontrado" })
        .expectStatus(404);
})