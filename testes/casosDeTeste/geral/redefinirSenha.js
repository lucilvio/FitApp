const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-G 04 - deve redefinir senha de acesso', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const email = `ana_${crypto.randomUUID()}@fitapp.com`;
    const idNutri = await nutricionista.cadastrarNutri(token, "ana", email, "99999999", "BFUDbHJKd");

    await spec()
        .patch('http://localhost:3000/usuarios')
        .withJson({
            "email": email,
        })
        .expectStatus(200);
});

it('CU-G 04 - Admin não deve redefinir senha', async () => {

    await spec()
        .patch('http://localhost:3000/usuarios')
        .withJson({
            "email": "admin@fitapp.com",
        })
        .expectJson({ erro: "Usuário não encontrado" })
        .expectStatus(404);
});
