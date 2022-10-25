const { spec } = require('pactum');
const crypto = require('crypto');
const planos = require('../../funcoes/plano')
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os dados do Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await planos.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, 15, "Experimente gratis por 15 dias");

    await spec()
        .get(`http://localhost:3000/planos/${idPlano}`)
        .expectJsonLike(
            {
               idPlano: idPlano
            }
        )
        .expectStatus(200);

        
})