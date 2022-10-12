const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 03 - O Personal Trainer deve alterar a senha', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .patch(`http://localhost:3000/personalTrainer/senha`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "senha": "1",
        })
        .expectStatus(200);

    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": 'personal@fitapp.com',
            "senha": '1'
        })
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/personalTrainer/senha`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "senha": "personal123",
        })
        .expectStatus(200);
})