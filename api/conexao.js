const mySql = require('mySql2');

function abrirConexao () {
    const conexao = mySql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'admin',
        database: 'FitApp'
    });

    conexao.connect();

    return conexao;
}

exports.abrirConexao = abrirConexao;