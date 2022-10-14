const { spec } = require('pactum');
const crypto = require('crypto');
const planos = require('../../funcoes/plano')
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os Planos ativos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano1 = await planos.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, 15, "Experimente gratis por 15 dias");
    const idPlano2 = await planos.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, 15, "Experimente gratis por 15 dias");

    await spec()
        .patch(`http://localhost:3000/admin/planos/${idPlano1}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "bloqueado": true
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/planos`)
        .expectJsonLike([
            {
               idPlano: idPlano2
            }
        ])
        .expectStatus(200);

        
})