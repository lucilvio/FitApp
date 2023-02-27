const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 03 - O Nutricionista deve alterar a senha', async () => {
    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .patch(`http://localhost:3000/usuarios/senha`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "senhaAtual": "nutri123",
            "novaSenha": "1"
        })
        .expectStatus(200);

    await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": 'nutri_teste@fitapp.com',
            "senha": '1'
        })
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/usuarios/senha`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "senhaAtual": "1",
            "novaSenha": "nutri123"
        })
        .expectStatus(200);
})

