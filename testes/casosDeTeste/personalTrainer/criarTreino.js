const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');
const crypto = require('crypto');


it('CU-P 08 - deve criar treino', async () => {
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
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos/idAssinante_teste/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                "treino": {
                    "nome": nomeTreino
                }
            }
        )
        .expectStatus(200);
});

it('CU-P 08 - não cria treino para aluno não encontrado', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .post(`${configuracoes.urlDaApi}/personalTrainer/alunos/id_incorreto/treinos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "nomeTreino": "Treino 1",
            "dataInicio": "09/30/2022",
            "dataFim": "10/31/2022",
            "objetivo": "Perda de Peso",
            "exercicios": [
                {
                    "diaDoTreino": "Segunda",
                    "descricao": "30min Eliptico"
                },
                {
                    "diaDoTreino": "Terça",
                    "descricao": "Cadeira Extensora"
                }
            ]

        })
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});

