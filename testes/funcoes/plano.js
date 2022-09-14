const { spec } = require('pactum');


async function cadastrarPlano(token, nome, valor, descricao) {
    return await spec()
        .post('http://localhost:3000/plano')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "valor": valor,
            "descricao": descricao
        })
        .returns("idPlano");
}

module.exports = {
    cadastrarPlano: cadastrarPlano,
}