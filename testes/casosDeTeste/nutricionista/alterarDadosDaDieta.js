const { spec } = require('pactum');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-N 10 - deve alterar dados da dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike([
            {
                idAssinante: 'idAssinante'
            }
        ])
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                nome: 'Assinante'
            }
        )
        .expectStatus(200);

    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 4", "01/12/2022", "31/12/2022", "Manutenção de Peso", [{ "refeicao": "almoço", "descricao": "Arroz" }]);

    await spec()
        .patch(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/${idDieta}`)
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
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                idDieta: idDieta,
                itens: [
                    {
                        "idDieta": idDieta,
                        "refeicao": "cafeDaManha",
                        "descricao": "Leite com café"
                    }
                ]
            }
        )
        .expectStatus(200);

});

it('CU-N  10 - não altera dieta para quando não encontra o paciente', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 4", "01/12/2022", "31/12/2022", "Manutenção de Peso", [{ "refeicao": "almoço", "descricao": "Arroz" }]);

    await spec()
        .patch(`http://localhost:3000/nutricionista/pacientes/${crypto.randomUUID()}/dietas/${idDieta}`)
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

it('CU-N  10 - não altera dieta quando não encontra a dieta', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 4", "01/12/2022", "31/12/2022", "Manutenção de Peso", [{ "refeicao": "almoço", "descricao": "Arroz" }]);

    await spec()
        .patch(`http://localhost:3000/nutricionista/pacientes/idAssinante/dietas/${crypto.randomUUID()}`)
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