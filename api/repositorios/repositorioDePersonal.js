const base = require('../dados');

function buscarPersonalPorEmail(email) {
    return base.dados.personalTrainers.find(personal => personal.email.toLowerCase() == email.toLowerCase());
}

function salvarDadosDoPersonal(novoPersonal) {
    base.dados.personalTrainers.push(novoPersonal);
}

function buscarPersonalPorFiltro(nome) {
    if (!nome) {
        return base.dados.personalTrainers;
    } else {
        return base.dados.personalTrainers.filter(personal => personal.nome.toLowerCase() == nome.toLowerCase());

    }
}

function buscarPersonalPorId(id) {
    return base.dados.personalTrainers.find(personal => personal.idPersonal == id);
}

function buscarAlunosPorFiltro(nome, idPersonal) {
    if(!nome) {
        return base.dados.assinantes.filter(assinante => assinante.personal == idPersonal);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.personal == idPersonal && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

module.exports = {
    buscarPersonalPorEmail: buscarPersonalPorEmail,
    salvarDadosDoPersonal: salvarDadosDoPersonal,
    buscarPersonalPorFiltro: buscarPersonalPorFiltro,
    buscarPersonalPorId: buscarPersonalPorId,
    buscarAlunosPorFiltro:  buscarAlunosPorFiltro,

};