const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 13 - deve criar dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .post(`http://localhost:3000/nutricionista/pacientes/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "dietaNome": "Dieta 1",
            "dataInicio": "01/10/2022",
            "dataFim": "31/10/2022",
            "objetivo": "Perda de Peso",
            "cafeDaManha": [],
            "lancheDaManha": [],
            "almoco": [],
            "lancheDaTarde": [],
            "jantar": [],
            "ceia": []
        })
        .expectStatus(200);



});

it('CU-N 13 - não criar dieta para paciente não encontrado', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .post(`http://localhost:3000/nutricionista/pacientes/idAssinante123`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectStatus(400);

});