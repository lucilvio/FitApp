const baseDeDados = require('../conexao');

async function buscarMedidaPorId(idAssinante, idMedidas) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select data, peso, pescoco, cintura, quadril 
            from medidas 
            where idAssinante = ? and idMedidas = ?`, [idAssinante, idMedidas]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function salvarMedidas(idUsuario, medidas) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const parametrosDeMedidas = [
            idUsuario,
            medidas.idMedidas,
            medidas.data,
            medidas.peso,
            medidas.pescoco,
            medidas.cintura,
            medidas.quadril
        ]

        await conexao.execute(
            `insert into medidas (idAssinante, idMedidas, data, peso, pescoco, cintura, quadril)
            values (?, ?, ?, ?, ?, ?, ?)`, parametrosDeMedidas);

    } finally {
        await conexao.end();
    }
}

async function buscarMedidas(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select data, idMedidas, peso, pescoco, cintura, quadril 
            from medidas
            where idAssinante = ?
            order by data desc`, [idAssinante]);

        if (rows.length <= 0)
            return;

        return rows;

    } finally {
        await conexao.end();
    }

}

async function excluirMedidas(idAssinante, idMedidas) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.execute(
            `delete from medidas
            where idAssinante = ? and idMedidas = ?`, [idAssinante, idMedidas]);

    } finally {
        await conexao.end();
    }
}

module.exports = {
    buscarMedidaPorId: buscarMedidaPorId,
    salvarMedidas: salvarMedidas,
    buscarMedidas: buscarMedidas,
    excluirMedidas: excluirMedidas
}