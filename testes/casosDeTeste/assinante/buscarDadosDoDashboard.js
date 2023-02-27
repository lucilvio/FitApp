const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('O Assinante deve ver os dados no Dashboard', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/dashboard`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idAssinante: "idAssinante_teste",
                nome: "assinante_teste"
            }
        )
        .expectStatus(200);

});