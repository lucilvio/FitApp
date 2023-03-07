const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const personalTrainer = require('../../funcoes/personalTrainer');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-P 10 - deve alterar dados do Treino', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    const nomeTreino = `treino_teste_${crypto.randomUUID()}`;

    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "idAssinante_teste",
        nomeTreino,
        "12/01/2023",
        "12/31/2023",
        "Hipertrofia",
        [
            {
                "diaDoTreino": "Segunda",
                "descricao": "30min Eliptico"
            },
            {
                "diaDoTreino": "Terça",
                "descricao": "Cadeira Extensora"
            }
        ]
    );

    const novoTreinoNome = `treino_teste_${crypto.randomUUID()}`;

    
    await spec()
        .patch(`${configuracoes.urlDaApi}/personalTrainer/alunos/idAssinante_teste/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nomeTreino": novoTreinoNome,
            "dataInicio": "12/01/2023",
            "dataFim": "12/31/2023",
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
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos/idAssinante_teste/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                "treino": {
                    "nome": novoTreinoNome
                }
            }
        )
        .expectStatus(200);

});

it('CU-P 10 - não altera Treino para quando não encontra o Aluno', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    const nomeTreino = `treino_teste_${crypto.randomUUID()}`;

    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "idAssinante_teste",
        nomeTreino,
        "12/01/2023",
        "12/31/2023",
        "Hipertrofia",
        [
            {
                "diaDoTreino": "Segunda",
                "descricao": "30min Eliptico"
            },
            {
                "diaDoTreino": "Terça",
                "descricao": "Cadeira Extensora"
            }
        ]
    );

    await spec()
        .patch(`${configuracoes.urlDaApi}/personalTrainer/alunos/id_incorreto/treinos/${idTreino}`)
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

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    
    await spec()
        .patch(`${configuracoes.urlDaApi}/personalTrainer/alunos/idAssinante_teste/treinos/id_incorreto`)
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