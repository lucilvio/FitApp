const base = require('../dados');
const baseDeDados = require('../conexao');

function buscarPersonalTrainersAtivos() {
    return base.dados.personalTrainers.filter(personal => personal.usuario.bloqueado == false);
}

function buscarPersonalPorEmail(email) {
    return base.dados.personalTrainers.find(personal => personal.email.toLowerCase() == email.toLowerCase());

}

function criarPersonal(novoPersonal) {
    base.dados.usuarios.push(novoPersonal.usuario);
    base.dados.personalTrainers.push(novoPersonal);
}

function buscarPersonalTrainersPorFiltro(nome) {
    if (!nome) {
        return base.dados.personalTrainers;
    } else {
        return base.dados.personalTrainers.filter(personal => personal.nome.toLowerCase() == nome.toLowerCase());

    }
}

async function buscarPersonalPorId(idPersonal) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select id_personal, nome, email, telefone, registro_profissional from personal_trainers where id_personal = ?`, [idPersonal]);

    if (rows.length <= 0)
        return;

    return rows[0];
}

function salvarAlteracaoDeDados(personal) {
    let personalEncontrado = buscarPersonalPorId(personal.idPersonal);

    personalEncontrado = personal;
}

function buscarAlunosPorFiltro(nome, emailPersonal) {
    const personal = buscarPersonalPorEmail(emailPersonal);

    if(!personal) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    if(!nome) {
        return base.dados.assinantes.filter(assinante => assinante.personalTrainer == personal.idPersonal);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.personalTrainer == personal.idPersonal && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function buscarAlunoPorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
}

function salvarTreino(treino) {
    const alunoEncontrado = buscarAlunoPorId(treino.idAssinante);
    alunoEncontrado.treinos.push(treino);
}

function buscarTreinoPorId(idAssinante, idTreino) {
    const alunoEncontrado = buscarAlunoPorId(idAssinante);
    return alunoEncontrado.treinos.find(treino => treino.idTreino == idTreino);
}


function salvarAlteracoesDoTreino(treino) {
    let treinoEncontrado = buscarTreinoPorId(treino.idAssinante, treino.idTreino);

    treinoEncontrado = treino;

}

module.exports = {
    buscarPersonalTrainersAtivos: buscarPersonalTrainersAtivos,
    buscarPersonalPorEmail: buscarPersonalPorEmail,
    criarPersonal: criarPersonal,
    buscarPersonalTrainersPorFiltro: buscarPersonalTrainersPorFiltro,
    buscarPersonalPorId: buscarPersonalPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    buscarAlunosPorFiltro:  buscarAlunosPorFiltro,
    buscarAlunoPorId: buscarAlunoPorId,
    buscarTreinoPorId: buscarTreinoPorId,
    salvarTreino: salvarTreino,
    salvarAlteracoesDoTreino: salvarAlteracoesDoTreino,
};