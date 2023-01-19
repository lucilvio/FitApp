const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-G 05  - O usuário deve alterar a senha', async () => {
    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .patch(`http://localhost:3000/usuarios/senha`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "senhaAtual": "assinante123",
            "novaSenha": "123456"
        })
        .expectStatus(200);

    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": 'assinante@fitapp.com',
            "senha": '123456'
        })
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/usuarios/senha`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "senhaAtual": "123456",
            "novaSenha": "assinante123",
        })
        .expectStatus(200);
})