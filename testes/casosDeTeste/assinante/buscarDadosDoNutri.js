const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 07 - O Assinante deve ver os dados do Nutricionista', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/perfil/nutricionistas/idNutri_teste`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            nome: "nutricionista_teste"
        })
        .expectStatus(200);



});

it('CU-AS 07 - O Assinante não ver os dados do Nutricionista quando o Id do Nutricionista não existe', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/perfil/nutricionistas/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({})
        .expectJson({ erro: "Nutricionista não encontrado" })
        .expectStatus(404);

});