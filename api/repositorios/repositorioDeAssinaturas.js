
const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');



function buscarAssinaturaAtiva(idAssinante) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(idAssinante);
    return assinanteEncontrado.assinaturas.find(assinatura => assinatura.bloqueado == false)
}

module.exports = {
    buscarAssinaturaAtiva: buscarAssinaturaAtiva,
}