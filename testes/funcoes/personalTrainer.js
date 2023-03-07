const { spec } = require('pactum');
const configuracoes = require('../configuracoes');

async function cadastrarPersonal(token, nome, email, telefone, registroProfissional) {
    return await spec()
        .post(`${configuracoes.urlDaApi}/admin/personalTrainers`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nome,
            "email": email,
            "telefone": telefone,
            "registroProfissional": registroProfissional
        })
        .returns("idPersonal");
       
}




async function criarTreino(tokenPersonal, idAssinante, nomeTreino, dataInicio, dataFim, objetivo, exercicios) {
    return await spec()
    .post(`${configuracoes.urlDaApi}/personalTrainer/alunos/${idAssinante}/treinos`)
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