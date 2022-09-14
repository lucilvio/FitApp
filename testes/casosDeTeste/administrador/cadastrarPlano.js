const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-A 19 - deve cadastrar Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .post('http://localhost:3000/plano')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `Gratuito_${crypto.randomUUID()}`,
            "valor": 0,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectStatus(200);
})