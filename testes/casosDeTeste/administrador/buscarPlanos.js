const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-A 15 - deve listar Planos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .get('http://localhost:3000/plano')
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});