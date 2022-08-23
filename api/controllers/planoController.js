const repositorioDePlano = require('../repositorios/repositorioDePlano.js');

function cadastrarPlano(req, res) {
    let novoPlano = {
        nome: req.body.nome,
        valor: req.body.valor,
        bloqueado: false,
        descricao: req.body.descricao
    }

    repositorioDePlano.salvarDadosDoPlano(novoPlano);

    res.send(novoPlano);
}

function buscarPlanos(req, res) {
    const nome = req.query.nome;
    let planos = repositorioDePlano.buscarPlanosPorFiltro(nome);

    res.send(planos.map(function (plano) {
        return {
            nome: plano.nome,
            valor: plano.valor,
            status: plano.bloqueado,
            descricao: plano.descricao
        }

    }))
}

module.exports = {
    cadastrarPlano: cadastrarPlano,
    buscarPlanos: buscarPlanos
}