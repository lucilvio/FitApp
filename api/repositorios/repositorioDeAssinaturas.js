const baseDeDados = require('../conexao');


async function buscarAssinaturaAtiva(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select idAssinatura 
        from assinaturas 
        where idAssinante = ? and bloqueado = 0`, [idAssinante]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

async function buscarAssinaturaPorId(idUsuario, idAssinatura) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select a.idPlano, a.dataInicio, a.dataFim, a.bloqueado,
        b.nome, b.valor, b.duracao, b.descricao, b.bloqueado
        from assinaturas as a
        inner join planos as b on a.idPlano = b.idPlano 
        where a.idAssinante = ? and a.idAssinatura = ?`, [idUsuario, idAssinatura]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

module.exports = {
    buscarAssinaturaAtiva: buscarAssinaturaAtiva,
    buscarAssinaturaPorId: buscarAssinaturaPorId,

}