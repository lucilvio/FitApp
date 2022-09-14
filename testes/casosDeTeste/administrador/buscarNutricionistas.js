const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-A 05 - deve listar Nutricionistas', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .get('http://localhost:3000/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});