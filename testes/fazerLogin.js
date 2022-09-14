const { spec } = require('pactum');


it('CU-G 01 - deve fazer login', async () => {
    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .expectStatus(200);
});

