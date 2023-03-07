const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-G 05  - O usuário deve alterar a senha', async () => {
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .patch(`${configuracoes.urlDaApi}/usuarios/senha`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "senhaAtual": "assinante123",
            "novaSenha": "123456"
        })
        .expectStatus(200);

    const tokenAssinante1 = await usuario.gerarToken('assinante_teste@fitapp.com', '123456');

    await spec()
        .patch(`${configuracoes.urlDaApi}/usuarios/senha`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante1)
        .withJson({
            "senhaAtual": "123456",
            "novaSenha": "assinante123",
        })
        .expectStatus(200);
})