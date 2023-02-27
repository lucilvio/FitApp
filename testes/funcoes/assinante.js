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

async function inserirMedidas(tokenAssinante, peso, pescoco, cintura, quadril) {
    return await spec()
        .post(`http://localhost:3000/assinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withJson({
            "peso": peso,
            "pescoco": pescoco,
            "cintura": cintura,
            "quadril": quadril
        })
        .returns("idMedidas");
}



module.exports = {
    cadastrarAssinante: cadastrarAssinante,
    inserirMedidas: inserirMedidas
}
