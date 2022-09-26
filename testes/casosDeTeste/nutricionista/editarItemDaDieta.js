const { spec } = require('pactum');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('CU-N 09/10/11/12 - deve alterar e/ou excluir itens da dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 4", "01/12/2022", "31/12/2022", "Manutenção de Peso", { "tipo": "almoço", "descricao": "Arroz" });

    await spec()
    .patch(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/${idDieta}`)
    .withHeaders("Authorization", "Bearer " + tokenNutri)
    .withJson({
        "dietaNome": "Dieta 4",
        "dataInicio": "01/12/2022",
        "dataFim": "31/12/2022",
        "objetivo": "Manutenção de Peso",
        "itens": [
            {
                "tipo": "cafeDaManha",
                "descricao": "Leite com café"
            }
        ],
    })
    .expectStatus(200);

});

it('CU-N  09/10/11/12 - não altera dieta para paciente não encontrado', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .post(`http://localhost:3000/nutricionista/pacientes/idAssinante123/IdDieta`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

it('CU-N  09/10/11/12 - não altera dieta para dieta não encontrada', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .post(`http://localhost:3000/nutricionista/pacientes/idAssinante/iddie11`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Dieta não encontrada" })
        .expectStatus(404);

});