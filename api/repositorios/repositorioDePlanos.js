const base = require('../dados');

function buscarPlanosAtivos() {
    return base.dados.planos.filter(plano => plano.bloqueado == false);
}

function criarPlano(novoPlano) {
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
    return base.dados.planos.find(plano => plano.idPlano == id);
}

function salvarAlteracaoDeDados(plano) {
    let planoEncontrado = buscarPlanoPorId(plano.idPlano);

    planoEncontrado = plano;
}

module.exports = {
    buscarPlanosAtivos: buscarPlanosAtivos,
    criarPlano: criarPlano,
    buscarPlanosPorNome: buscarPlanosPorNome,
    buscarPlanosPorFiltro: buscarPlanosPorFiltro,
    buscarPlanoPorId: buscarPlanoPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados
}