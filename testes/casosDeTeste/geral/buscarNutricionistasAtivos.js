const { spec } = require('pactum');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os Nutricionistas ativos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const emailNutriBloqueado =  `nutri_teste_${crypto.randomUUID()}@fitapp.com`;
    const idNutriBloqueado = await nutricionista.cadastrarNutri(token, `nutri_teste_${crypto.randomUUID()}`, emailNutriBloqueado, "99999999", "crn000");
    const idNutriAtivo = await nutricionista.cadastrarNutri(token, `nutri_teste_${crypto.randomUUID()}`, `nutri_teste_${crypto.randomUUID()}@fitapp.com`, "555555555", "CRN 555");

    await spec()
        .patch(`http://localhost:3000/admin/nutricionistas/${idNutriBloqueado}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "nutri_bloqueado",
            "email": emailNutriBloqueado,
            "telefone": "000000000",
            "registroProfissional": "CRN 123",
            "bloqueado": true
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/nutricionistas`)
        .expectJsonLike([
            {
                idNutri: idNutriAtivo
            }
        ])
        .expectStatus(200);


})