const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 03 - O Assinante deve alterar a senha', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .patch(`http://localhost:3000/assinante/senha`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "senha": "1",
        })
        .expectStatus(200);

    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": 'assinante@fitapp.com',
            "senha": '1'
        })
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/assinante/senha`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "senha": "assinante123",
        })
        .expectStatus(200);



});