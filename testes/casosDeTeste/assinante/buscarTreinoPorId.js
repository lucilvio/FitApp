const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');

it('CU-AS 14 - O Assinante deve ver detalhes do Treino', async () => {
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

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/treino/${idTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            "idTreino": idTreino
        })
        .expectStatus(200);



});

it('CU-AS 11 - O Assinante não vê detalhes do Treino quando o Id do Treino não existe', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/treino/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJson({erro: "Treino não encontrado"})
        .expectStatus(404);


});