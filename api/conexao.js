const mySql = require('mysql2/promise');
const bluebird = require('bluebird');

async function abrirConexao () {
    const conexao = await mySql.createConnection({
        host: 'localhost',
        user: 'fitapp_user',
        password: '4542',
        database: 'db_fitapp',
        Promise: bluebird
    });

    return conexao;
}

module.exports = {
    abrirConexao: abrirConexao
}
