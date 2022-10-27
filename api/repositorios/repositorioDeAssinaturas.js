const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');

function buscarAssinaturaAtiva(idAssinante) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(idAssinante);
    return assinanteEncontrado.assinaturas.find(assinatura => assinatura.bloqueado == false)
}

function buscarAssinaturaPorId(idAssinante, idAssinatura) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(idAssinante);
    return assinanteEncontrado.assinaturas.find(assinatura => assinatura.idAssinatura == idAssinatura)
}

module.exports = {
    buscarAssinaturaAtiva: buscarAssinaturaAtiva,
    buscarAssinaturaPorId: buscarAssinaturaPorId,
    
}