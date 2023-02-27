const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');


it('CU-N 08 - deve criar dieta', async () => {
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

it('CU-N 08 - não cria dieta para paciente não encontrado', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .post(`http://localhost:3000/nutricionista/pacientes/id_incorreto/dietas`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "dietaNome": "Dieta 2",
            "dataInicio": "01/10/2023",
            "dataFim": "31/10/2023",
            "objetivo": "Perda de Peso",
            "itens": [
                {
                    "refeicao": "cafeDaManha",
                    "descricao": "Leite com café"
                }
            ],
        })
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

