const base = require('../dados.js');

function salvarDadosDoPlano(novoPlano) {
    base.dados.planos.push(novoPlano);
}

function buscarPlanosPorFiltro(nome) {
    if(!nome) {
        return base.dados.planos;
    } else {
        return base.dados.planos.filter(plano => plano.nome.toLowerCase() == nome.toLowerCase());
        
    }
}

module.exports = {
    salvarDadosDoPlano: salvarDadosDoPlano,
    buscarPlanosPorFiltro: buscarPlanosPorFiltro
}