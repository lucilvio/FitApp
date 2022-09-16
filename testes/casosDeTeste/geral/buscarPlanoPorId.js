const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');
const crypto = require('crypto');

it('CU-A 17 - deve ver os dados do Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    await spec()
        .get(`http://localhost:3000/plano/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});