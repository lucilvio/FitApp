// const { spec } = require('pactum');
// const configuracoes = require('../../configuracoes');

// const usuario = require('../../funcoes/usuario');

// it('CU-AS 05 - O Assinante deve cancelar a Assinatura', async () => {

//     const tokenAssinante = await usuario.gerarToken('assinanteassinatura_teste@fitapp.com', 'assinante123');

//     await spec()
//         .delete(`${configuracoes.urlDaApi}/assinante/assinaturas/idAssinaturaAssinatura_teste`)
//         .withHeaders("Authorization", "Bearer " + tokenAssinante)        
//         .expectStatus(200);    

// });



