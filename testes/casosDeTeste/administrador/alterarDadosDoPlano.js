const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');

const crypto = require('crypto');

it('CU-A 18 - deve alterar dados do Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    await spec()
        .patch(`http://localhost:3000/admin/plano/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `Gratuito_55`,
            "valor": 0,
            "bloqueado": true,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectStatus(200);
})