const baseDeDados = require('../conexao');


async function buscarAssinaturaAtiva(idAssinante) {
    try {
        const conexao = await baseDeDados.abrirConexao();

        const [rows, fields] = await conexao.execute(
            `select idAssinatura 
        from assinaturas 
        where idAssinante = ? and bloqueado = 0`, [idAssinante]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function buscarAssinaturaPorId(idUsuario, idAssinatura) {
    try {
        const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select a.idPlano, a.dataInicio, a.dataFim, a.bloqueado,
        b.nome, b.valor, b.duracao, b.descricao
        from assinaturas as a
        inner join planos as b on a.idPlano = b.idPlano 
        where a.idAssinante = ? and a.idAssinatura = ?`, [idUsuario, idAssinatura]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function cancelarAssinatura(idUsuario, idAssinatura) {

    try {
        const conexao = await baseDeDados.abrirConexao();

        await conexao.execute(
            `update assinaturas
            set bloqueado = true
            where idAssinante = ? and idAssinatura = ?`, [idUsuario, idAssinatura]);

    } finally {
        await conexao.end();
    }
}


async function alterarPlanoDaAssinatura(idUsuario, novaAssinatura) {
    const conexao = await baseDeDados.abrirConexao();

    const parametrosDaAssinatura = [
        novaAssinatura.idAssinatura,
        novaAssinatura.idAssinante,
        novaAssinatura.idPlano,
        novaAssinatura.dataInicio,
        novaAssinatura.dataFim,
        novaAssinatura.bloqueado
    ];

    try {
        await conexao.beginTransaction();
        await conexao.execute(
            `update assinaturas
            set bloqueado = true
            where idAssinante = ?`, [idUsuario]);

        await conexao.execute(
            `insert into assinaturas (idAssinatura, idAssinante, idPlano, dataInicio, dataFim, bloqueado) 
            values (?, ?, ?, ?, ?, ?);`, parametrosDaAssinatura)
        await conexao.commit();

    } finally {
        await conexao.end();
    }
}

module.exports = {
    buscarAssinaturaAtiva: buscarAssinaturaAtiva,
    buscarAssinaturaPorId: buscarAssinaturaPorId,
    cancelarAssinatura: cancelarAssinatura,
    alterarPlanoDaAssinatura: alterarPlanoDaAssinatura,
    cancelarAssinatura: cancelarAssinatura,
    alterarPlanoDaAssinatura: alterarPlanoDaAssinatura

}