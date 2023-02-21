const base = require('../dados');
const baseDeDados = require('../conexao');


async function verificarSeJaExistePlanoCadastradoPeloNome(nome) {

    try {
        const conexao = await baseDeDados.abrirConexao();

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

    try {
        const conexao = await baseDeDados.abrirConexao();

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

    try {
        const conexao = await baseDeDados.abrirConexao();

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

async function buscarPlanoPorId(idPlano) {
    
    try {
        const conexao = await baseDeDados.abrirConexao();
        
        const [rows, fields] = await conexao.execute(
            `select idPlano, nome, valor, duracao, descricao, bloqueado 
            from planos 
            where idPlano = ?`, [idPlano]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function salvarAlteracaoDeDados(idPlano, nome, valor, duracao, descricao, bloqueado) {
    
    try {
        const conexao = await baseDeDados.abrirConexao();
        
        const [rows, fields] = await conexao.execute(
            `update planos
            set nome = ?, valor = ?, duracao = ?,  descricao = ?,  bloqueado = ? 
            where idPlano = ?`, [nome, valor, duracao, descricao, bloqueado, idPlano]);

    } finally {
        await conexao.end();
    }
}


async function buscarPlanosAtivos() {
    
    try {
        const conexao = await baseDeDados.abrirConexao();
       
        const [rows, fields] = await conexao.execute(
            `select idPlano, nome, valor, duracao, descricao, bloqueado 
            from planos 
            where bloqueado = false`);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}


module.exports = {
    verificarSeJaExistePlanoCadastradoPeloNome: verificarSeJaExistePlanoCadastradoPeloNome,
    buscarPlanosAtivos: buscarPlanosAtivos,
    criarPlano: criarPlano,
    buscarPlanosPorFiltro: buscarPlanosPorFiltro,
    buscarPlanoPorId: buscarPlanoPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados
}