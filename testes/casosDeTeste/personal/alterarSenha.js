const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 03 - O personal deve alterar a senha', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .patch(`http://localhost:3000/personal/idPersonal/senha`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "senha": "1",
        })
        .expectStatus(200);

   
})