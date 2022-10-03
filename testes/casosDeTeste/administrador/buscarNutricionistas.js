const { spec } = require('pactum');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('CU-A 05 - deve listar Nutricionistas', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");
    

    await spec()
        .get('http://localhost:3000/admin/nutricionistas')
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike([
            {
                idNutri: idNutri
            }
        ])
        .expectStatus(200);
});