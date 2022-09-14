const { spec } = require('pactum');

async function cadastrarPersonal(token, nome, email, telefone, registroProfissional) {
    return await spec()
        .post('http://localhost:3000/personal')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "email": email,            
            "telefone": telefone,
            "registroProfissional": registroProfissional
        })
        .returns("idPersonal");
}

module.exports = {
    cadastrarPersonal: cadastrarPersonal,
}