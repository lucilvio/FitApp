const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 08 - O Assinante deve ver os dados do Personal Trainer', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/perfil/personalTrainers/idPersonal`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectStatus(200);

});

it('CU-AS 08 - O Assinante não vê os dados do Personal Trainer quando o Id do Personal não existe', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/perfil/personalTrainers/idPersonal123`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectJson({ erro: "Personal Trainer não encontrado" })
        .expectStatus(404);

});