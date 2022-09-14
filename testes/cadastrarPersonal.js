const { spec } = require('pactum');
const crypto = require('crypto');

it('CU-A 14 - deve cadastrar Personal', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token")

    await spec()
        .post('http://localhost:3000/personal')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Bruno",
            "email": `bruno_${crypto.randomUUID()}@fitapp.com`,
            "senha": "123456",
            "telefone": "55 555 55 55",
            "registroProfissional": "CRN 123"
        })
        .expectStatus(200);
})