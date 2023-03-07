const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('O Assinante deve ver os dados no Dashboard', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/dashboard`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idAssinante: "idAssinante_teste",
                nome: "assinante_teste"
            }
        )
        .expectStatus(200);

});