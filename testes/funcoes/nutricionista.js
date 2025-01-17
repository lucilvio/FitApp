const { spec } = require('pactum');

async function cadastrarNutri(token, nome, email, telefone, registroProfissional) {
    return await spec()
        .post('http://localhost:3000/admin/nutricionistas')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "email": email,            
            "telefone": telefone,
            "registroProfissional": registroProfissional
        })
        .returns("idNutri");
       
}




async function criarDieta(tokenNutri, idAssinante, nomeDieta, dataInicio, dataFim, objetivo, itens) {
    return await spec()
    .post(`http://localhost:3000/nutricionista/pacientes/${idAssinante}/dietas`)
    .withHeaders("Authorization", "Bearer " + tokenNutri)
    .withJson({
        "nomeDieta": nomeDieta,
        "dataInicio":dataInicio,
        "dataFim": dataFim,
        "objetivo": objetivo,
        "itens": itens
    })
    .returns("idDieta");

}


module.exports = {
    cadastrarNutri: cadastrarNutri,
    criarDieta: criarDieta
}