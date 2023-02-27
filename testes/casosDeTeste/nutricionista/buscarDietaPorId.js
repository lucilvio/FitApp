const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-N 09 - deve ver os detalhes da dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    const nomeDieta = `dieta_teste_${crypto.randomUUID()}`;

    const idDieta = await nutricionista.criarDieta(tokenNutri, "idAssinante_teste",
        nomeDieta,
        "10/01/2022",
        "10/31/2022",
        "manutencao de peso",
        [
            {
                "refeicao": "cafeDaManha",
                "descricao": "Iogurte natural"
            },
            {
                "refeicao": "almoço",
                "descricao": "Frango Grelhado"
            }
        ]);

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante_teste/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                "dieta": {
                    "nome": nomeDieta
                }
            }
        )
        .expectStatus(200);

});

it('CU-N 09 - não encontra Dieta quando o id do paciente não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    const nomeDieta = `dieta_teste_${crypto.randomUUID()}`;

    const idDieta = await nutricionista.criarDieta(tokenNutri, "idAssinante_teste",
        nomeDieta,
        "10/01/2022",
        "10/31/2022",
        "manutencao de peso",
        [
            {
                "refeicao": "cafeDaManha",
                "descricao": "Iogurte natural"
            },
            {
                "refeicao": "almoço",
                "descricao": "Frango Grelhado"
            }
        ]);

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/id_incorreto/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

it('CU-N 09 - não encontra Dieta quando o id da dieta não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante_teste/dietas/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Dieta não encontrada" })
        .expectStatus(404);

});