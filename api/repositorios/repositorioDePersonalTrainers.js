const base = require('../dados');


function buscarPersonalPorEmail(email) {
    return base.dados.personalTrainers.find(personal => personal.email.toLowerCase() == email.toLowerCase());

}

function criarPersonal(novoPersonal) {
    base.dados.usuarios.push(novoPersonal.usuario);
    base.dados.personalTrainers.push(novoPersonal);
}

function buscarPersonalPorFiltro(nome) {
    if (!nome) {
        return base.dados.personalTrainers;
    } else {
        return base.dados.personalTrainers.filter(personal => personal.nome.toLowerCase() == nome.toLowerCase());

    }
}

function buscarPersonalPorId(idPersonal) {
    return base.dados.personalTrainers.find(Personal => Personal.idPersonal == idPersonal);
}

function salvarAlteracaoDeDados(personal) {
    let PersonalEncontrado = buscarPersonalPorId(personal.idPersonal);

    PersonalEncontrado = personal;
}

function buscarAlunosPorFiltro(nome, emailPersonal) {
    const personal = buscarPersonalPorEmail(emailPersonal);

    if(!personal) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    if(!nome) {
        return base.dados.assinantes.filter(assinante => assinante.personal == personal.idPersonal);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.personal == personal.idPersonal && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function buscarAlunoPorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
}

function salvarTreino(idAssinante, nomeTreino, dataInicio, dataFim, objetivo, exercicios) {

    const aluno = buscarAlunoPorId(idAssinante);

    if (!aluno) {
        res.status(404).send({ erro: "Aluno não encontrado" });
        return;
    }

    aluno.adicionarTreino(nomeTreino, dataInicio, dataFim, objetivo, exercicios);

    aluno.treinos.push(novoTreino);
    return novoTreino;

}

function buscarTreinoPorId(alunoEncontrado, idTreino) {
    return alunoEncontrado.treinos.find(treino => treino.idTreino == idTreino);
}

function salvarAlteracoesDoTreino(treinoEncontrado, nomeTreino, dataInicio, dataFim, objetivo, exercicios) {
   treinoEncontrado.nomeTreino = nomeTreino;
   treinoEncontrado.dataInicio = dataInicio;
   treinoEncontrado.dataFim = dataFim;
   treinoEncontrado.objetivo = objetivo;
   treinoEncontrado.exercicios = exercicios;

}



module.exports = {
    criarPersonal: criarPersonal,
    buscarPersonalPorEmail: buscarPersonalPorEmail,
    buscarPersonalPorFiltro: buscarPersonalPorFiltro,
    buscarPersonalPorId: buscarPersonalPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    buscarAlunosPorFiltro:  buscarAlunosPorFiltro,
    buscarAlunoPorId: buscarAlunoPorId,
    salvarTreino: salvarTreino,
    buscarTreinoPorId: buscarTreinoPorId,
    salvarAlteracoesDoTreino: salvarAlteracoesDoTreino,

};