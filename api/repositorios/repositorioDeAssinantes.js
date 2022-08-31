const base = require('../dados.js');

function buscarAssianantePorEmail(email) {
    return base.dados.assinantes.find(assianate => assianate.email.toLowerCase() == email.toLowerCase());
}

function salvarDadosDoAssinante(novoAssinante) {
    base.dados.assinantes.push(novoAssinante);
}

module.exports = {
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    salvarDadosDoAssinante: salvarDadosDoAssinante,
}