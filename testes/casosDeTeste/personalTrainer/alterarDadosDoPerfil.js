const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 02 - O Personal deve alterar os dados do perfil', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .patch(`http://localhost:3000/personalTrainer/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "imagem": "umaFoto",
            "telefone": "555555555",
        })
        .expectStatus(200);

   

})