const base = require('../dados');
const baseDeDados = require('../conexao');

function buscarPersonalTrainersAtivos() {
    return base.dados.personalTrainers.filter(personal => personal.usuario.bloqueado == false);
}

async function verificarSePersonalJaTemCadastro(email) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select idUsuario, login 
            from usuarios 
            where login = ?`, [email.toLowerCase()]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }

}

async function criarPersonal(novoPersonal) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const parametrosDoUsuario = [
            novoPersonal.usuario.idUsuario,
            novoPersonal.usuario.perfil,
            novoPersonal.usuario.nome,
            novoPersonal.usuario.login,
            novoPersonal.usuario.senha,
            novoPersonal.usuario.bloqueado
        ]

        const parametrosDoPersonal = [
            novoPersonal.idPersonal,
            novoPersonal.nome,
            novoPersonal.email,
            novoPersonal.telefone,
            novoPersonal.registroProfissional
        ]

        await conexao.beginTransaction();

        await conexao.execute(
            `insert into usuarios (idUsuario, perfil, nome, login, senha, bloqueado) 
            values (?, ?, ?, ?, ?, ?);`, parametrosDoUsuario);
        await conexao.execute(
            `insert into personal_trainers (idPersonal, nome, email, telefone, registroProfissional) 
            values (?, ?, ?, ?, ?);`, parametrosDoPersonal);

        await conexao.commit();

    } finally {
        await conexao.end();
    }
}

async function buscarPersonalTrainersPorFiltro(nome) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select a.idPersonal, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.bloqueado 
                from personal_trainers as a
                inner join usuarios as b on a.idPersonal = b.idUsuario`);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select a.idPersonal, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.bloqueado 
                from personal_trainers as a
                inner join usuarios as b on a.idPersonal = b.idUsuario
                where a.nome = ?`, [nome.toLowerCase()]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }
}

async function buscarPersonalPorId(idPersonal) {
    const conexao = await baseDeDados.abrirConexao();
    try {

        const [rows, fields] = await conexao.execute(
            `select a.idPersonal, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.imagem, b.bloqueado 
        from personal_trainers as a
        inner join usuarios as b on a.idPersonal = b.idUsuario
        where a.idPersonal = ?`, [idPersonal]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function salvarAlteracaoDeDados(idPersonal, nome, email, telefone, registroProfissional, bloqueado) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.beginTransaction();

        await conexao.execute(
            `update usuarios
            set nome = ?, login = ?, bloqueado = ?
            where idUsuario = ?`, [nome, email, bloqueado, idPersonal]);

        await conexao.execute(
            `update personal_trainers
            set nome = ?, email = ?, telefone = ?, registroProfissional = ?
            where idPersonal = ?`, [nome, email, telefone, registroProfissional, idPersonal]);

        await conexao.commit();

    } finally {
        await conexao.end();
    }
}


function buscarAlunosPorFiltro(nome, emailPersonal) {
    const personal = buscarPersonalPorEmail(emailPersonal);

    if (!personal) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    if (!nome) {
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
    verificarSePersonalJaTemCadastro: verificarSePersonalJaTemCadastro,
    criarPersonal: criarPersonal,
    buscarPersonalTrainersPorFiltro: buscarPersonalTrainersPorFiltro,
    buscarPersonalPorId: buscarPersonalPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    buscarAlunosPorFiltro: buscarAlunosPorFiltro,
    buscarAlunoPorId: buscarAlunoPorId,
    buscarTreinoPorId: buscarTreinoPorId,
    salvarTreino: salvarTreino,
    salvarAlteracoesDoTreino: salvarAlteracoesDoTreino,
};