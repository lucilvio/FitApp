const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');

it('CU-AS 09 - O Assinante deve ver historico de dietas', async () => {
    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');
    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "refeicao": "cafeDaManha", "descricao": "Leite com café" }]);

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/dietas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike([{
            "idDieta": idDieta
        }])
        .expectStatus(200);



});