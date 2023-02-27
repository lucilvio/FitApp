const { spec } = require('pactum');
const crypto = require('crypto');
const personalTrainers = require('../../funcoes/personalTrainer');
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os Personal Trainers ativos', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const emailPersonalBloqueado =  `nutri_Bloqueado_teste_${crypto.randomUUID()}@fitapp.com`;
    const idPersonalBloqueado = await personalTrainers.cadastrarPersonal(token, `personal_teste_${crypto.randomUUID()}`, emailPersonalBloqueado, "99999999", "crn000");
    const idPersonalAtivo = await personalTrainers.cadastrarPersonal(token, `personal_teste_${crypto.randomUUID()}`, `personal_teste_${crypto.randomUUID()}@fitapp.com`, "555555555", "CRN 555");


    await spec()
        .patch(`http://localhost:3000/admin/personalTrainers/${idPersonalBloqueado}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "personal_bloqueado",
            "email": emailPersonalBloqueado,
            "telefone": "000000000",
            "registroProfissional": "CRN 123",
            "bloqueado": true
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/personalTrainers`)
        .expectJsonLike([
            {
               idPersonal: idPersonalAtivo
            }
        ])
        .expectStatus(200);

        
})