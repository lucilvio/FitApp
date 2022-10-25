const { spec } = require('pactum');
const crypto = require('crypto');
const personalTrainers = require('../../funcoes/personalTrainer');
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os dados do Personal Trainer', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPersonal = await personalTrainers.cadastrarPersonal(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/personalTrainers/${idPersonal}`)
        .expectJsonLike(
            {
               idPersonal: idPersonal
            }
        )
        .expectStatus(200);

        
})