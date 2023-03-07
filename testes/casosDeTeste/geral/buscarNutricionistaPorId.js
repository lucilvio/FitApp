const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('o sistema apresenta os dados do Nutricionista ', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    
    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionistas/${idNutri}`)
        .expectJsonLike(
            {
               idNutri: idNutri
            }
        )
        .expectStatus(200);

        
})