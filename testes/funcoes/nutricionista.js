const { spec } = require('pactum');

async function cadastrarNutri(token, nome, email, telefone, registroProfissional) {
    return await spec()
        .post('http://localhost:3000/admin/nutricionista')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "email": email,            
            "telefone": telefone,
            "registroProfissional": registroProfissional
        })
        .returns("idNutri");
       
}

async function criarDieta(tokenNutri, dietaNome, dataInicio, dataFim, objetivo, cafeDaManha, lancheDaManha, almoco, lancheDaTarde, jantar, ceia ) {
    return await spec()
    .post(`http://localhost:3000/nutricionista/pacientes/idAssinante`)
    .withHeaders("Authorization", "Bearer " + tokenNutri)
    .withJson({
        "dietaNome": dietaNome,
        "dataInicio":dataInicio,
        "dataFim": dataFim,
        "objetivo": objetivo,
        "cafeDaManha": cafeDaManha,
        "lancheDaManha": lancheDaManha,
        "almoco": almoco,
        "lancheDaTarde": lancheDaTarde,
        "jantar": jantar,
        "ceia": ceia
    })
    .returns("idDieta");

}


module.exports = {
    cadastrarNutri: cadastrarNutri,
    criarDieta: criarDieta
}