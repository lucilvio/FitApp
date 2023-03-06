const { spec } = require('pactum');
const assinante = require('../../funcoes/assinante');
const usuario = require('../../funcoes/usuario');

it('CU-AS 16 - O Assinante deve excluir medidas', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    const idMedidas = await assinante.inserirMedidas(tokenAssinante, 60, 0, 0, 0);

    await spec()
        .delete(`http://localhost:3000/assinante/medidas/${idMedidas}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectStatus(200);


});