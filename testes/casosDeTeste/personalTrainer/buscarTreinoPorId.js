const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');
const crypto = require('crypto');

it('CU-P 09 - deve ver os detalhes do Treino', async () => {

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
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante_teste/treinos/${idTreino}`)
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

it('CU-P 09 - não encontra treino quando o id do paciente não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "idAssinante_teste",
        "treino_teste",
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
        .get(`http://localhost:3000/personalTrainer/alunos/id_incorreto/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});

it('CU-P 09 - não encontra treino quando o id do Treino não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante_teste/treinos/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Treino não encontrado" })
        .expectStatus(404);

});