const { spec } = require('pactum');
const crypto = require('crypto');

it('CU-A 04 - deve buscar Nutricionista por Id', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token");

    const nutri = await spec()
        .post('http://localhost:3000/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana_${crypto.randomUUID()}@fitapp.com`,
            "senha": "123456",
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123"
        })
        .returns("idNutri");

    await spec()
        .patch(`http://localhost:3000/assinante/${assinante}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "bloqueado": true
        })
        .expectStatus(200);
});