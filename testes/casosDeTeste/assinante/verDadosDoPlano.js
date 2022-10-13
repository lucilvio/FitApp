const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-AS 04 - O Assinante deve ver os dados do plano', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/planos/idPlano`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idPlano: "idPlano"
            }
        )
        .expectStatus(200);

});

it('CU-AS 04 - O Assinante não deve ver os dados quando não encontra o plano por Id', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/planos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJson({ erro: "Plano não encontrado" })
        .expectStatus(404);

});