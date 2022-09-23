const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');

it('CU-N 08 - deve ver os detalhes da dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", `01/11/2022`, "30/11/2022", "Manutenção de Peso", "", "", "", "", "", "");

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                idDieta: idDieta
            }
        )
        .expectStatus(200);

});

it('CU-N 08 - não encontra Dieta quando o id do paciente não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/id/dietas/id`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

it('CU-N 08 - não encontra Dieta quando o id da dieta não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/id`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Dieta não encontrada" })
        .expectStatus(404);

});