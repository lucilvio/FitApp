const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-AS 01 - O Assinante deve ver os dados do Perfil', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`${configuracoes.urlDaApi}/assinante/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idAssinante: "idAssinante_teste",
                nome: "assinante_teste"
            }
        )
        .expectStatus(200);

});