const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const crypto = require('crypto');
const planos = require('../../funcoes/plano')
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os Planos ativos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano1 = await planos.cadastrarPlano(token, `planoBloqueado_teste_${crypto.randomUUID()}`, 0, 15, "Experimente gratis por 15 dias");
    const idPlano2 = await planos.cadastrarPlano(token, `planoAtivo_teste_${crypto.randomUUID()}`, 0, 15, "Experimente gratis por 15 dias");

   
    await spec()
        .patch(`${configuracoes.urlDaApi}/admin/planos/${idPlano1}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `Anual_${crypto.randomUUID()}`,
            "valor": 100,
            "bloqueado": true,
            "duracao": 30,
            "descricao": "Experimente gratis por 10 dias"
        })
        .expectStatus(200);

    await spec()
        .get(`${configuracoes.urlDaApi}/planos`)
        .expectJsonLike([
            {
                idPlano: idPlano2
            }
        ])
        .expectStatus(200);
})