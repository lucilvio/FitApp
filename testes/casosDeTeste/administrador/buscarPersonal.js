const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-A 10 - deve listar Personal Trainers', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .get('http://localhost:3000/personal')
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});