const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-G 02 - deve redefinir Senha de acesso', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const email = `ana_teste_${crypto.randomUUID()}@fitapp.com`;
    const idNutri = await nutricionista.cadastrarNutri(token, "ana_teste", email, "99999999", "crm000");

    await spec()
        .post('http://localhost:3000/esqueciMinhaSenha')
        .withJson({
            "email": email,
        })
        .expectStatus(200);
});

it('CU-G 02 - Não deve redefinir senha de acesso quando não tem cadastro', async () => {

    await spec()
        .post('http://localhost:3000/esqueciMinhaSenha')
        .withJson({
            "email": "1111@email.com",
        })
        .expectJson({ erro: "Usuário não encontrado" })
        .expectStatus(404);
});


 it('CU-G 02 - Admin não deve redefinir senha de acesso', async () => {

    await spec()
        .post('http://localhost:3000/esqueciMinhaSenha')
        .withJson({
            "email": "admin@fitapp.com",
        })
        .expectJson({ erro: "Usuário não encontrado" })
        .expectStatus(404);
});
