const baseDeDados = require('../conexao');

async function buscarTreinosPorFiltro(nome, idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select idTreino, nome, objetivo, dataInicio, dataFim, data 
            from treinos
            where idAssinante = ?
            order by data desc`, [idAssinante]);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select idTreino, nome, objetivo, dataInicio, dataFim, data  
            from treinos 
            where nome = ? and idAssinante = ?
            order by data desc`, [nome.toLowerCase(), idAssinante]);

        return rowsComFiltro;
    }
    finally {
        await conexao.end();
    }
}

async function buscarTreinoPorId(idAssinante, idTreino) {

    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select nome, objetivo, dataInicio, dataFim, data
            from treinos
            where idTreino = ? and idAssinante = ?`, [idTreino, idAssinante]);

        const [exercicios, fieldsItens] = await conexao.execute(
            `select idExercicio, descricao, diaDoTreino
            from exercicios
            where idTreino = ?`, [idTreino]);

        if (rows.length <= 0)
            return;

        return {
            treino: rows[0],
            exercicios: exercicios
        }

    } finally {
        await conexao.end();
    }
}


module.exports = {
    buscarTreinosPorFiltro: buscarTreinosPorFiltro,
    buscarTreinoPorId: buscarTreinoPorId
}