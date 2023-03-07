const mySql = require('mysql2/promise');
const bluebird = require('bluebird');
const configuracoes = require('./configuracoes');

async function abrirConexao () {
    const conexao = await mySql.createConnection({
        host: configuracoes.host,
        user: configuracoes.user,
        password: configuracoes.password,
        database: configuracoes.database,
        Promise: bluebird
    });

    return conexao;
}

module.exports = {
    abrirConexao: abrirConexao
}
