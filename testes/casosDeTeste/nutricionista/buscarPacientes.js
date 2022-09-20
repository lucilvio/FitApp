const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 05 - deve listar os Pacientes', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/idNutri/paciente`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike([
            {
                idAssinante: 'idAssinante'
            }
        ])
        .expectStatus(200);



});

it('CU-N 05 - não deve listar os Pacientes para Personal', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/nutricionista/idNutri/paciente`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectStatus(401);



});