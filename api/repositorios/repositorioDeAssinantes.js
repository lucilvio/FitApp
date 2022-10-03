const base = require('../dados');
const crypto = require('crypto');


function buscarAssianantePorEmail(email) {
    return base.dados.assinantes.find(assinante => assinante.email.toLowerCase() == email.toLowerCase());
}

function criarAssinante(novoAssinante) {
    base.dados.usuarios.push(novoAssinante.usuario);
    base.dados.assinantes.push(novoAssinante);
}



function buscarAssinantePorFiltro(nome) {
    if (!nome) {
        return base.dados.assinantes;
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nome.toLowerCase() == nome.toLowerCase());

    }
}

function buscarAssinantePorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
}

function salvarAlteracaoDeDados(assinante) {
    let assinanteEncontrado = buscarAssinantePorId(assinante.idAssinante);

    assinanteEncontrado = assinante;
}

module.exports = {
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    criarAssinante: criarAssinante,
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    buscarAssinantePorFiltro: buscarAssinantePorFiltro,
    buscarAssinantePorId: buscarAssinantePorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados
}