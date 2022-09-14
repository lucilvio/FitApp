const { spec } = require('pactum');
const crypto = require('crypto');

it('CU-G 06 - deve cadastrar Assinante', async () => {
    const token = await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": "admin@fitapp.com",
            "senha": "admin123"
        })
        .returns("token");

    const plano = await spec()
        .post('http://localhost:3000/plano')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Gratuito_" + crypto.randomUUID(),
            "valor": 0,
            "descricao": "Experimente gratis por 15 dias"
        })
        .returns("idPlano");

    const nutri = await spec()
        .post('http://localhost:3000/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana_${crypto.randomUUID()}@fitapp.com`,
            "senha": "123456",
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123"
        })
        .returns("idNutri");

    const personal = await spec()
        .post('http://localhost:3000/personal')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Bruno",
            "email": `bruno_${crypto.randomUUID()}@fitapp.com`,
            "senha": "123456",
            "telefone": "55 555 55 55",
            "registroProfissional": "CRN 123"
        })
        .returns("idPersonal");

    await spec()
        .post('http://localhost:3000/assinante')
        .withJson({
            "nome": "Guilherme",
            "email": `Guilherme_${crypto.randomUUID()}@fitapp.com`,
            "idPlano": plano,
            "idNutri": nutri,
            "idPersonal": personal
        })
        .expectStatus(200);
});