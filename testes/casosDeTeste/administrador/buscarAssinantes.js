const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-A 01 - deve listar assinantes', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .get('http://localhost:3000/assinante')
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});