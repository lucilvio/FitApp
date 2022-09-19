const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 03 - O Nutricionista deve alterar a senha', async () => {
    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .patch(`http://localhost:3000/nutricionista/idNutri/senha`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "senha": "1",
        })
        .expectStatus(200);

   
})