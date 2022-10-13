const { spec } = require('pactum');

async function cadastrarAssinante(nome, email, idPlano, idNutri, idPersonal) {
    return await spec()
    .post('http://localhost:3000/assinantes')
    .withJson({
        "nome": nome,
        "email": email,
        "idPlano": idPlano,
        "idNutri": idNutri,
        "idPersonal": idPersonal
    })
    .returns("idAssinante");
}

module.exports = {
    cadastrarAssinante: cadastrarAssinante,
}
