const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');

it('CU-N 13 - deve criar dieta', async () => {
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


    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "refeicao": "cafeDaManha", "descricao": "Leite com café" }]);

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                dietas: [
                    {
                        idDieta: idDieta
                    }
                ]
            }
        )
        .expectStatus(200);



});

it('CU-N 13 - não cria dieta para paciente não encontrado', async () => {

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

    await spec()
        .post(`http://localhost:3000/nutricionista/pacientes/idAssinante123/dietas`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "dietaNome": "Dieta 2",
            "dataInicio": "01/10/2022",
            "dataFim": "31/10/2022",
            "objetivo": "Perda de Peso",
            "itens": [
                {
                    "tipo": "cafeDaManha",
                    "descricao": "Leite com café"
                }
            ],
        })
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});

