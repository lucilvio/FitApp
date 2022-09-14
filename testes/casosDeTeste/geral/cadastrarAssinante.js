const { spec } = require('pactum');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const personal = require('../../funcoes/personal');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');

it('CU-G 06 - deve cadastrar Assinante', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    const idPersonal = await personal.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "55 555 55 55", "CRN 123");
    

    await spec()
        .post('http://localhost:3000/assinante')
        .withJson({
            "nome": "Guilherme",
            "email": `Guilherme_${crypto.randomUUID()}@fitapp.com`,
            "idPlano": idPlano,
            "idNutri": idNutri,
            "idPersonal": idPersonal
        })
        .expectStatus(200);
});