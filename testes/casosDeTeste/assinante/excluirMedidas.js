const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 17 - O Assinante deve excluir medidas', async () => {

    const tokenAssinante = await usuario.gerarToken('assinantemedidas@fitapp.com', 'assinante123');

    await spec()
        .delete(`http://localhost:3000/assinante/medidas/idMedida`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectStatus(200);

    
});