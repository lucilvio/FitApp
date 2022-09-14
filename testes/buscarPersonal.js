const { spec } = require('pactum');

it('CU-A 10 - deve listar Personal Trainers', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token")

    await spec()
        .get('http://localhost:3000/personal')
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});