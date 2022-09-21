const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personal = require('../../funcoes/personal');
const crypto = require('crypto');

it('CU-A 13 - deve alterar dados do Personal', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPersonal = await personal.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "55 555 55 55", "CRN 123");
    
    await spec()
        .patch(`http://localhost:3000/admin/personal/${idPersonal}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Bruno",
            "email": `bruno55@fitapp.com`,
            "telefone": "55 555 55 55",
            "registroProfissional": "CRN 123",
            "bloqueado": true
        })
        .expectStatus(200);
})