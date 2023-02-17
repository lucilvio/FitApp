const base = require('../dados');
const baseDeDados = require('../conexao');


async function verificarSeJaExistePlanoCadastradoPeloNome(nome) {
    const conexao = await baseDeDados.abrirConexao();
    try {
        const [rows, fields] = await conexao.execute(
            `select nome 
            from planos 
            where nome = ?`, [nome]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function criarPlano(novoPlano) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const parametrosDoPlano = [
            novoPlano.idPlano,
            novoPlano.nome.toLowerCase(),
            novoPlano.valor,
            novoPlano.duracao,
            novoPlano.descricao,
            novoPlano.bloqueado
        ]

        await conexao.execute(
            `insert into planos (idPlano, nome, valor, duracao, descricao, bloqueado) 
            values (?, ?, ?, ?, ?, ?);`, parametrosDoPlano);

    } finally {
        await conexao.end();
    }
}

async function buscarPlanosPorFiltro(nome) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select idPlano, nome, valor, duracao, descricao, bloqueado 
            from planos`);

            return rows;
        }


        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select idPlano, nome, valor, duracao, descricao, bloqueado 
            from planos 
            where nome = ?`, [nome.toLowerCase()]);


        return rowsComFiltro;


    } finally {
        await conexao.end();
    }


}

function buscarPlanosPorNome(nome) {
    return base.dados.planos.find(plano => plano.nome.toLowerCase() == nome.toLowerCase());
}

function buscarPlanosAtivos() {
    return base.dados.planos.filter(plano => plano.bloqueado == false);
}







async function buscarPlanoPorId(id) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select idPlano, nome, valor, duracao, descricao, bloqueado from planos where idPlano = ?`, [id]);

    if (rows.length <= 0)
        return;

    return rows[0];
}

function salvarAlteracaoDeDados(plano) {
    let planoEncontrado = buscarPlanoPorId(plano.idPlano);

    planoEncontrado = plano;
}

module.exports = {
    verificarSeJaExistePlanoCadastradoPeloNome: verificarSeJaExistePlanoCadastradoPeloNome,
    buscarPlanosAtivos: buscarPlanosAtivos,
    criarPlano: criarPlano,
    verificarSeJaExistePlanoCadastradoPeloNome: buscarPlanosPorNome,
    buscarPlanosPorFiltro: buscarPlanosPorFiltro,
    buscarPlanoPorId: buscarPlanoPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados
}