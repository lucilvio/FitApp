const { spec } = require('pactum');
const crypto = require('crypto');

it('CU-A 09 - deve cadastrar Nutricionista', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token")

    await spec()
        .post('http://localhost:3000/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana_${crypto.randomUUID()}@fitapp.com`,
            "senha": "123456",
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123"
        })
        .expectStatus(200);
})