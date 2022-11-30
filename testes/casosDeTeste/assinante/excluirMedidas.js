const { spec } = require('pactum');
const assinante = require('../../funcoes/assinante');
const usuario = require('../../funcoes/usuario');

it('CU-AS 17 - O Assinante deve excluir medidas', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    const idMedida = await assinante.inserirMedidas(tokenAssinante, 80, 30, 71, 95);

    await spec()
        .delete(`http://localhost:3000/assinante/medidas/${idMedida}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectStatus(200);
    
});