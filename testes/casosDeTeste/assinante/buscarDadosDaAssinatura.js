const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-AS 04 - O Assinante deve ver os dados da Assinatura', async () => {

     const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/assinaturas/idAssinatura_teste`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            nome: "gratuito_teste"
        })
        .expectStatus(200);

});

it('CU-AS 04 - O Assinante não vê os dados da Assinatura quando o Id da assinatura não existe', async () => {

     const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/assinaturas/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectJson({ erro: "Assinatura não encontrada" })
        .expectStatus(404);

});

