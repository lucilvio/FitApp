const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 05 - deve listar os alunos', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personal/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike([
            {
                idAssinante: 'idAssinante'
            }
        ])
        .expectStatus(200);



});

it('CU-P 05 - não deve listar os alunos para Nutricionista', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/personal/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectStatus(401);



});