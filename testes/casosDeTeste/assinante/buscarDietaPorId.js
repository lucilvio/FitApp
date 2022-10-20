const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');

it('CU-AS 11 - O Assinante deve ver detalhes da dieta', async () => {
    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');
    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "refeicao": "cafeDaManha", "descricao": "Leite com café" }]);

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            "idDieta": idDieta
        })
        .expectStatus(200);



});

it('CU-AS 11 - O Assinante não vê detalhes da dieta quando o Id da dieta não existe', async () => {
    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');
    const idDieta = await nutricionista.criarDieta(tokenNutri, "Dieta 3", "01/10/2022", "31/10/2022", "Perda de Peso", [{ "refeicao": "cafeDaManha", "descricao": "Leite com café" }]);

    const tokenAssinante = await usuario.gerarToken('assinante@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/dietas/idDieta123`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJson({erro: "Dieta não encontrada"})
        .expectStatus(404);



});