const { spec } = require('pactum');

async function cadastrarPersonal(token, nome, email, telefone, registroProfissional) {
    return await spec()
        .post('http://localhost:3000/admin/personalTrainers')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "email": email,            
            "telefone": telefone,
            "registroProfissional": registroProfissional
        })
        .returns("idPersonal");
       
}




async function criarTreino(tokenPersonal, nomeTreino, dataInicio, dataFim, objetivo, exercicios) {
    return await spec()
    .post(`http://localhost:3000/personalTrainer/alunos/idAssinante/treinos`)
    .withHeaders("Authorization", "Bearer " + tokenPersonal)
    .withJson({
        "nomeTreino": nomeTreino,
        "dataInicio":dataInicio,
        "dataFim": dataFim,
        "objetivo": objetivo,
        "exercicios": exercicios
    })
    .returns("idTreino");

}


module.exports = {
    cadastrarPersonal: cadastrarPersonal,
    criarTreino: criarTreino
}