const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');


it('CU-AS 02 - O Assinante deve alterar os dados do Perfil', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec() 
        .patch(`http://localhost:3000/assinante/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "nome": "assinante_teste",
            "dataNascimento": "03/17/1987",
            "idSexo": 1,
            "altura": 186
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/assinante/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idAssinante: "idAssinante_teste",
                altura: 186
            }
        )
        .expectStatus(200);



});