const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-A 09 - deve cadastrar Nutricionista', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .post('http://localhost:3000/admin/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": `ana_${crypto.randomUUID()}@fitapp.com`,
            "senha": "123456",
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123"
        })
        .expectStatus(200);
})

it('CU-A 09 - não deve cadastrar Nutricionista se o email já foi cadastrado', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    const email = `ana_${crypto.randomUUID()}@fitapp.com`;

    await spec()
        .post('http://localhost:3000/admin/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": email,
            "senha": "123456",
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123"
        })
        .expectStatus(200);

    await spec()
        .post('http://localhost:3000/admin/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": "Ana",
            "email": email,
            "senha": "123456",
            "telefone": "55 5555555",
            "registroProfissional": "CRN 123"
        })
        .expectJson({ erro: "Esse e-mail já foi cadastrado" })
        .expectStatus(400);
})