const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 01 - O Personal Trainer deve ver os dados do Perfil', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                idPersonal: 'idPersonal_teste',
                email: 'personal_teste@fitapp.com'
            }
        )
        .expectStatus(200);



});