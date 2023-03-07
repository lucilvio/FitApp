const { spec } = require('pactum');
const configuracoes = require('../configuracoes');

async function gerarToken(login, senha) {
    return await spec()
        .post(`${configuracoes.urlDaApi}/login`)
        .withJson({
            "email": login,
            "senha": senha
        })
        .returns("token");
}

module.exports = {
    gerarToken: gerarToken,
}