const { spec } = require('pactum');
const crypto = require('crypto');

it('CU-A 19 - deve cadastrar Plano', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token")

    await spec()
        .post('http://localhost:3000/plano')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `Gratuito_${crypto.randomUUID()}`,
            "valor": 0,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectStatus(200);
})