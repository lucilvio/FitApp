const { spec } = require('pactum');

it('CU-A 05 - deve listar Nutricionistas', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token")

    await spec()
        .get('http://localhost:3000/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});