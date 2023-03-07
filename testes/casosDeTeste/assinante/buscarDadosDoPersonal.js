const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-AS 08 - O Assinante deve ver os dados do Personal Trainer', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/perfil/personalTrainers/idPersonal_teste`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            nome: "personal_teste"
        })
        .expectStatus(200);

});

it('CU-AS 08 - O Assinante não vê os dados do Personal Trainer quando o Id do Personal não existe', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/perfil/personalTrainers/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectJson({ erro: "Personal Trainer não encontrado" })
        .expectStatus(404);

});