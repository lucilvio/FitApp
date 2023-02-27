const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personalTrainer = require('../../funcoes/personalTrainer');
const crypto = require('crypto');

it('CU-AS 12 - O Assinante deve ver historico de Treinos', async () => {
    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    const nomeTreino = `treino_teste${crypto.randomUUID()}`;

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

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/treinos`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike([{
            "idTreino": idTreino
        }])
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/assinante/treinos/?nome=${nomeTreino}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike([{
            "idTreino": idTreino
        }])
        .expectStatus(200);
});