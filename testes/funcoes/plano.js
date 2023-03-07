const { spec } = require('pactum');
const configuracoes = require('../configuracoes');


async function cadastrarPlano(token, nome, valor, duracao, descricao) {
    return await spec()
        .post(`${configuracoes.urlDaApi}/admin/planos`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "valor": valor,
            "duracao": duracao,
            "descricao": descricao
        })
        .returns("idPlano");
}

module.exports = {
    cadastrarPlano: cadastrarPlano,
}