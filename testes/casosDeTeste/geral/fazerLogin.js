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

it('CU-G 01 - Não deve fazer login quando usuario ou senha incorretos', async () => {
    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin"
        })
        .expectJson({ erro: "login ou senha incorreto"})
        .expectStatus(400);
});

it('CU-G 01 - Não deve fazer login quando usuario estiver bloqueado', async () => {
    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "assinantebloqueado_teste@fitapp.com",
            "senha": "assinante123"
        })
        .expectJson({ erro: "Usuario bloqueado"})
        .expectStatus(400);
});

