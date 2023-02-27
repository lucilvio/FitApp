const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');

it('CU-AS 11 - O Assinante deve ver detalhes da dieta', async () => {
    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    const idDieta = await nutricionista.criarDieta(tokenNutri, "idAssinante_teste",
        "dieta_teste",
        "10/01/2023",
        "10/31/2023", "perda de peso",
        [
            {
                "refeicao": "cafeDaManha",
                "descricao": "Iogurte natural"
            },
            {
                "refeicao": "almoço",
                "descricao": "Frango Grelhado"
            }
        ]);

    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/dietas/${idDieta}`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJsonLike({
            "idDieta": idDieta
        })
        .expectStatus(200);



});

it('CU-AS 11 - O Assinante não vê detalhes da dieta quando o Id da dieta não existe', async () => {
    
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    await spec()
        .get(`http://localhost:3000/assinante/dietas/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .expectJson({ erro: "Dieta não encontrada" })
        .expectStatus(404);



});