const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personal = require('../../funcoes/personal');
const crypto = require('crypto');

it('CU-A 12 - deve ver os dados do personal', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const email = `bruno_${crypto.randomUUID()}@fitapp.com`;
    const idPersonal = await personal.cadastrarPersonal(token, "bruno", email, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/admin/personalTrainers/${idPersonal}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idPersonal: idPersonal,
                nome: "bruno",
            }
        )
        .expectStatus(200);
});

it('CU-A 12 - não encontra Personal quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const email = `bruno_${crypto.randomUUID()}@fitapp.com`;
    const idPersonal = await personal.cadastrarPersonal(token, "bruno", email, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/admin/personalTrainers/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJson({ erro: "Personal Trainer não encontrado" })
        .expectStatus(404);
});