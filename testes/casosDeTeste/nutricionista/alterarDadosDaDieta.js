const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-N 10 - deve alterar dados da dieta', async () => {

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

    const novoNomeDieta = `dieta_teste_${crypto.randomUUID()}`;

    await spec()
        .patch(`${configuracoes.urlDaApi}/nutricionista/pacientes/idAssinante_teste/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "nomeDieta": novoNomeDieta,
            "dataInicio": "01/01/2023",
            "dataFim": "01/31/2023",
            "objetivo": "Manutenção de Peso",
            "itens": [
                {
                    "refeicao": "cafeDaManha",
                    "descricao": "Leite com café"
                },
                {
                    "refeicao": "almoço",
                    "descricao": "Arroz"
                }
            ],
        })
        .expectStatus(200);

    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/pacientes/idAssinante_teste/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                "dieta": {
                    "nome": novoNomeDieta
                }
            }
        )
        .expectStatus(200);

});

it('CU-N 10 - não altera dieta para quando não encontra o paciente', async () => {

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
        .patch(`${configuracoes.urlDaApi}/nutricionista/pacientes/id_incorreto/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "nomeDieta": "Dieta 4",
            "dataInicio": "01/12/2022",
            "dataFim": "31/12/2022",
            "objetivo": "Manutenção de Peso",
            "itens": [
                {
                    "refeicao": "cafeDaManha",
                    "descricao": "Leite com café"
                },
                {
                    "refeicao": "almoço",
                    "descricao": "Arroz"
                }
            ],
        })
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

it('CU-N 10 - não altera dieta quando não encontra a dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .patch(`${configuracoes.urlDaApi}/nutricionista/pacientes/idAssinante_teste/dietas/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "nomeDieta": "Dieta 4",
            "dataInicio": "01/12/2022",
            "dataFim": "31/12/2022",
            "objetivo": "Manutenção de Peso",
            "itens": [
                {
                    "refeicao": "cafeDaManha",
                    "descricao": "Leite com café"
                },
                {
                    "refeicao": "almoço",
                    "descricao": "Arroz"
                }
            ],
        })
        .expectJson({ erro: "Dieta não encontrada" })
        .expectStatus(404);

});