const base = require('../dados');
const crypto = require('crypto');


function buscarAssianantePorEmail(email) {
    return base.dados.assinantes.find(assinante => assinante.email.toLowerCase() == email.toLowerCase());
}

function criarAssinante(usuario, idPlano, idNutri, idPersonal) {
    let novoAssinante = {
        idAssinante: crypto.randomUUID(),
        usuario: usuario,
        nome: usuario.nome,
        email: usuario.login,
        dataNascimento: '',
        sexo: '',
        altura: '',
        assinatura: {
            id: crypto.randomUUID(),
            idPlano: idPlano,
        },
        nutricionista: idNutri,
        personal: idPersonal,
        objetivo: '',
        dietas: [],
        treinos: [],
        medidas: []

    }

    base.dados.assinantes.push(novoAssinante);
    return novoAssinante;

}



function buscarAssinantePorFiltro(nome) {
    if (!nome) {
        return base.dados.assinantes;
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nome.toLowerCase() == nome.toLowerCase());

    }
}

function buscarAssinantePorId(id) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == id);
}

module.exports = {
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    criarAssinante: criarAssinante,
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    buscarAssinantePorFiltro: buscarAssinantePorFiltro,
    buscarAssinantePorId: buscarAssinantePorId,
}