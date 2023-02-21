const baseDeDados = require('../conexao');

async function buscarDietasPorFiltro(nome, idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select idDieta, nome, objetivo, dataInicio, dataFim, data 
            from dietas
            where idAssinante = ?
            order by data desc`, [idAssinante]);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select idDieta, nome, objetivo, dataInicio, dataFim, data  
            from dietas 
            where nome = ? and idAssinante = ?
            order by data desc`, [nome.toLowerCase(), idAssinante]);

        return rowsComFiltro;
    }
    finally {
        await conexao.end();
    }
}

async function buscarDietaPorId(idAssinante, idDieta) {

    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select nome, objetivo, dataInicio, dataFim, data
            from dietas
            where idDieta = ? and idAssinante = ?`, [idDieta, idAssinante]);

        const [itens, fieldsItens] = await conexao.execute(
            `select idItemDieta, descricao, refeicao
            from itens_dieta
            where idDieta = ?`, [idDieta]);

        if (rows.length <= 0)
            return;

        return {
            dieta: rows[0],
            itensDaDieta: itens
        }

    } finally {
        await conexao.end();
    }
}


module.exports = {
    buscarDietasPorFiltro: buscarDietasPorFiltro,
    buscarDietaPorId: buscarDietaPorId
}