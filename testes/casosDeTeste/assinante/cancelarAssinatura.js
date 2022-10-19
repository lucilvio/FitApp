const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 05 - O Assinante deve cancelar a Assinatura', async () => {


    const tokenAssinante = await usuario.gerarToken('assinanteassinaturateste@fitapp.com', 'assinante123');

    await spec()
        .delete(`http://localhost:3000/assinante/assinaturas/idAssinaturaTeste`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectStatus(200);

    const tokenAdmin = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .patch(`http://localhost:3000/admin/assinantes/idAssinanteAssinaturaTeste`)
        .withHeaders("Authorization", "Bearer " + tokenAdmin)
        .withJson({
            "bloqueado": false
        })
        .expectStatus(200);
});



