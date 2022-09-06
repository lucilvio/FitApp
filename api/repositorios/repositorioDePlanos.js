const base = require('../dados');

function salvarDadosDoPlano(novoPlano) {
    base.dados.planos.push(novoPlano);
}

function buscarPlanosPorNome(nome) {
    return base.dados.planos.find(plano => plano.nome.toLowerCase() == nome.toLowerCase());
}

function buscarPlanosPorFiltro(nome) {
    if(!nome) {
        return base.dados.planos;
    } else {
        return base.dados.planos.filter(plano => plano.nome.toLowerCase() == nome.toLowerCase());
        
    }
}

function buscarPlanoPorId(id) {
    return base.dados.planos.find(plano => plano.id == id);
}

module.exports = {
    salvarDadosDoPlano: salvarDadosDoPlano,
    buscarPlanosPorNome: buscarPlanosPorNome,
    buscarPlanosPorFiltro: buscarPlanosPorFiltro,
    buscarPlanoPorId: buscarPlanoPorId
}