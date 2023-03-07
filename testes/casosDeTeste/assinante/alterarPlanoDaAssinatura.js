const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-AS 06 - O Assinante deve alterar o plano da Assinatura', async () => {
     const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .patch(`${configuracoes.urlDaApi}/assinante/assinaturas/idAssinatura_teste`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "idPlano": "idAnual_teste"
        })
        .expectStatus(200);

});

it('CU-AS 06 - O Assinante não altera o plano da Assinatura quando o Id da Assinatura não existe', async () => {
     const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .patch(`${configuracoes.urlDaApi}/assinante/assinaturas/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "idPlano": "idAnual_teste"
        })
        .expectJson({ erro: "Assinatura não encontrada" })
        .expectStatus(404);

})