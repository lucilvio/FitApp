const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-AS 02 - O Assinante deve alterar os dados do Perfil', async () => {

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .patch(`http://localhost:3000/assinante/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "imagem": "umaImagem.jpg",
            "dataNascimento": "23/01/2006",
            "sexo": "Masculino",
            "altura": 178
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/assinante/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike(
            {
                idAssinante: "idAssinante",
                imagem: "umaImagem.jpg"
            }
        )
        .expectStatus(200);



});