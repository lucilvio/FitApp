const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personal = require('../../funcoes/personal');
const crypto = require('crypto');

it('CU-A 12 - deve ver os dados do Personal', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const idPersonal = await personal.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/personal/${idPersonal}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectStatus(200);
});