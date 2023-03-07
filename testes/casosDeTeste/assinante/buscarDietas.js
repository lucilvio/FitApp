const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-AS 09 - O Assinante deve ver historico de dietas', async () => {
    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    const nomeDieta = `dieta_teste_${crypto.randomUUID()}`;

    const idDieta = await nutricionista.criarDieta(tokenNutri, "idAssinante_teste",
        nomeDieta, 
        "10/01/2022", 
        "10/31/2022", 
        "perda de peso",
        [
            {
                "refeicao": "cafeDaManha",
                "descricao": "Iogurte natural"
            },
            {
                "refeicao": "almoço",
                "descricao": "Frango Grelhado"
            }
        ]);

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/dietas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike([{
            "idDieta": idDieta
        }])
        .expectStatus(200);

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/dietas/?nome=${nomeDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike([{
            "idDieta": idDieta
        }])
        .expectStatus(200);

});