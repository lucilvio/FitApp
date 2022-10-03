const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 02 - O Nutricionista deve alterar os dados do perfil', async () => {
    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .patch(`http://localhost:3000/nutricionista/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "imagem": "umaFoto",
            "telefone": "555555555",
        })
        .expectStatus(200);

   

})

