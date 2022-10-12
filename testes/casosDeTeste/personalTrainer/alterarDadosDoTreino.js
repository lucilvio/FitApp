const { spec } = require('pactum');
const personalTrainer = require('../../funcoes/personalTrainer');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-P 10 - deve alterar dados do Treino', async () => {

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

    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 4", "01/12/2022", "31/12/2022", "Hipertrofia", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    await spec()
        .patch(`http://localhost:3000/personalTrainer/alunos/idAssinante/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nomeTreino": "Treino 4",
            "dataInicio": "01/12/2022",
            "dataFim": "31/12/2022",
            "objetivo": "Hipertrofia",
            "exercicios": [
                {
                    "diaDoTreino": "segunda",
                    "descricao": "30min de esteira ergometrica"
                },
                {
                    "diaDoTreino": "terça",
                    "descricao": "Leg Press 45"
                }
            ],
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                idTreino: idTreino,
                exercicios: [
                    {
                        "idTreino": idTreino,
                        "diaDoTreino": "segunda",
                        "descricao": "30min de esteira ergometrica"
                    }
                ]
            }
        )
        .expectStatus(200);

});

it('CU-P 10 - não altera Treino para quando não encontra o Aluno', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 4", "01/12/2022", "31/12/2022", "Hipertrofia", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    await spec()
        .patch(`http://localhost:3000/personalTrainer/alunos/${crypto.randomUUID()}/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nomeTreino": "Treino 4",
            "dataInicio": "01/12/2022",
            "dataFim": "31/12/2022",
            "objetivo": "Manutenção de Peso",
            "exercicios": [
                {
                    "diaDoTreino": "segunda",
                    "descricao": "30min de esteira ergometrica"
                },
                {
                    "diaDoTreino": "terça",
                    "descricao": "Leg Press 45"
                }
            ],
        })
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});

it('CU-P 10 - não altera Treino quando não encontra o Treino', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 4", "01/12/2022", "31/12/2022", "Hipertrofia", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    await spec()
        .patch(`http://localhost:3000/personalTrainer/alunos/idAssinante/treinos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nomeTreino": "Treino 4",
            "dataInicio": "01/12/2022",
            "dataFim": "31/12/2022",
            "objetivo": "Manutenção de Peso",
            "exercicios": [
                {
                    "diaDoTreino": "segunda",
                    "descricao": "30min de esteira ergometrica"
                },
                {
                    "diaDoTreino": "terça",
                    "descricao": "Leg Press 45"
                }
            ],
        })
        .expectJson({ erro: "Treino não encontrado" })
        .expectStatus(404);

});