const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 01 - o Nutricionista deve ver os dados do Perfil', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                idNutri: 'idNutri_teste',
                email: 'nutri_teste@fitapp.com'
            }
        )
        .expectStatus(200);
});