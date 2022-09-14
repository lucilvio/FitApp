const { spec } = require('pactum');

async function gerarToken(login, senha) {
    return await spec()
        .post('http://localhost:3000/login')
        .withJson({
            "email": login,
            "senha": senha
        })
        .returns("token");
}

module.exports = {
    gerarToken: gerarToken,
}