const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');
const crypto = require('crypto');

it('CU-P 09 - deve ver os detalhes do Treino', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');
    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                idTreino: idTreino
            }
        )
        .expectStatus(200);

});

it('CU-P 09 - não encontra treino quando o id do paciente não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');
    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/${crypto.randomUUID()}/treinos/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});

it('CU-P 09 - não encontra treino quando o id do Treino não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante/treinos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Treino não encontrado" })
        .expectStatus(404);

});