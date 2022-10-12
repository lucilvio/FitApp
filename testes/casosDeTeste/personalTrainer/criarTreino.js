const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');
const crypto = require('crypto');

it('CU-P 08 - deve criar treino', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike([
            {
                idAssinante: 'idAssinante'
            }
        ])
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                nome: 'Assinante'
            }
        )
        .expectStatus(200);


    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                treinos: [
                    {
                        idTreino: idTreino
                    }
                ]
            }
        )
        .expectStatus(200);

});

it('CU-P 08 - não cria treino para aluno não encontrado', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike([
            {
                idAssinante: 'idAssinante'
            }
        ])
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                nome: 'Assinante'
            }
        )
        .expectStatus(200);

    await spec()
        .post(`http://localhost:3000/personalTrainer/alunos/${crypto.randomUUID()}/treinos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nomeTreino": "Treino 2",
            "dataInicio": "01/10/2022",
            "dataFim": "31/10/2022",
            "objetivo": "Perda de Peso",
            "exercicios": [
                {
                    "diaDoTreino": "segunda",
                    "descricao": "30min de esteira ergometrica"
                }
            ],
        })
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});

