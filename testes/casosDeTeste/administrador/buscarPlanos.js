const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');
const plano = require('../../funcoes/plano');

it('CU-A 15 - deve listar Planos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    await spec()
        .get('http://localhost:3000/admin/plano')
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike([
            {
                idPlano: idPlano
            }
        ])
        .expectStatus(200);
});

