const { spec } = require('pactum');

async function cadastrarNutri(token, nome, email, telefone, registroProfissional) {
    return await spec()
        .post('http://localhost:3000/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "email": email,            
            "telefone": telefone,
            "registroProfissional": registroProfissional
        })
        .returns("idNutri");
}

module.exports = {
    cadastrarNutri: cadastrarNutri,
}