const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-N 09 - deve ver os detalhes da dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');
    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", `01/11/2022`, "30/11/2022", "Manutenção de Peso", [{ "refeicao": "cafeDaManha", "descricao": "Leite com café" }]);

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

it('CU-N 09 - não encontra Dieta quando o id do paciente não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');
    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", `01/11/2022`, "30/11/2022", "Manutenção de Peso", [{ "refeicao": "cafeDaManha", "descricao": "Leite com café" }]);

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/${crypto.randomUUID()}/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

it('CU-N 09 - não encontra Dieta quando o id da dieta não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Dieta não encontrada" })
        .expectStatus(404);

});