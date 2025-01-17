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
            where nome like ? and idAssinante = ?
            order by data desc`, [`%${nome}%`, idAssinante]);

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

        if (rows.length <= 0)
            return;

        const [itens, fieldsItens] = await conexao.execute(
            `select idItemDieta, descricao, refeicao
            from itens_dieta
            where idDieta = ?`, [idDieta]);

        return {
            dieta: rows[0],
            itensDaDieta: itens
        }

    } finally {
        await conexao.end();
    }
}

async function salvarDieta(idAssinante, novaDieta) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const parametrosDaDieta = [
            idAssinante,
            novaDieta.idDieta,
            novaDieta.idNutri,
            novaDieta.objetivo,
            novaDieta.nomeDieta,
            novaDieta.dataInicio,
            novaDieta.dataFim,
            novaDieta.data
        ]

        await conexao.beginTransaction();
        await conexao.execute(
            `insert into dietas (idAssinante, idDieta, idNutri, objetivo, nome, dataInicio, dataFim, data)
            values (?, ?, ?, ?, ?, ?, ?, ?)`, parametrosDaDieta);


        novaDieta.itens.forEach(async item => {
            const parametrosDoItem = [
                item.idItemDieta,
                item.idDieta,
                item.descricao,
                item.refeicao
            ]

            await conexao.execute(
                `insert into itens_dieta (idItemDieta, idDieta, descricao, refeicao) 
                values (?, ?, ?, ?)`, parametrosDoItem);

        });
        await conexao.commit();

    } finally {
        await conexao.end();
    }
}

async function salvarAlteracoesDaDieta(idDieta, nomeDieta, dataInicio, dataFim, objetivo, itens) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.beginTransaction();

        await conexao.execute(
            `update dietas
            set nome = ?, objetivo = ?, dataInicio = ?, dataFim = ?
            where idDieta = ?`, [nomeDieta, objetivo, new Date(dataInicio), new Date(dataFim), idDieta]);

        itens.forEach(async item => {
            const parametrosDoItem = [
                item.idItemDieta,
                item.idDieta,
                item.descricao,
                item.refeicao
            ]

            await conexao.execute(
                `replace into itens_dieta (idItemDieta, idDieta, descricao, refeicao)
                values (?, ?, ?, ?)`, parametrosDoItem);
        });

        await conexao.commit();

    }
    finally {
        await conexao.end();
    }

}

module.exports = {
    buscarDietasPorFiltro: buscarDietasPorFiltro,
    buscarDietaPorId: buscarDietaPorId,
    salvarDieta: salvarDieta,
    salvarAlteracoesDaDieta: salvarAlteracoesDaDieta
}