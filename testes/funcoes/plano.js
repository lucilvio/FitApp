const { spec } = require('pactum');


async function cadastrarPlano(token, nome, valor, duracao, descricao) {
    return await spec()
        .post('http://localhost:3000/admin/planos')
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