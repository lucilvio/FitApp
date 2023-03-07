const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('CU-A 05 - deve listar Nutricionistas', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");
    

    await spec()
        .get(`${configuracoes.urlDaApi}/admin/nutricionistas`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike([
            {
                idNutri: idNutri
            }
        ])
        .expectStatus(200);
});