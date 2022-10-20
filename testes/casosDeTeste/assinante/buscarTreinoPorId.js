const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');

it('CU-AS 14 - O Assinante deve ver detalhes do Treino', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');
    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 4", "01/12/2022", "31/12/2022", "Hipertrofia", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/treino/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            "idTreino": idTreino
        })
        .expectStatus(200);



});

it('CU-AS 11 - O Assinante não vê detalhes do Treino quando o Id do Treino não existe', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');
    const idTreino = await personalTrainer.criarTreino(tokenPersonal, "Treino 4", "01/12/2022", "31/12/2022", "Hipertrofia", [{ "diaDoTreino": "segunda", "descricao": "30min de esteira ergometrica" }]);

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/treino/idTreino123`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJson({erro: "Treino não encontrado"})
        .expectStatus(404);


});