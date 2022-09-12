const base = require('../dados');

function buscarAssianantePorEmail(email) {
    return base.dados.assinantes.find(assinante => assinante.email.toLowerCase() == email.toLowerCase());
}

function salvarDadosDoAssinante(novoAssinante) {
    base.dados.assinantes.push(novoAssinante);
}


function buscarAssinantePorFiltro(nome) {
    if (!nome) {
        return base.dados.assinantes;
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nome.toLowerCase() == nome.toLowerCase());

    } 
}

function buscarAssinantePorId(id) {
    return base.dados.assinantes.find(assinante => assinante.id == id);
}

module.exports = {
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    salvarDadosDoAssinante: salvarDadosDoAssinante,
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    buscarAssinantePorFiltro: buscarAssinantePorFiltro,
    buscarAssinantePorId: buscarAssinantePorId,
}