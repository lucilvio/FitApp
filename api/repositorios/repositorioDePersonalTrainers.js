const base = require('../dados');
const crypto = require('crypto');

function buscarPersonalPorEmail(email) {
    return base.dados.personalTrainers.find(personal => personal.email.toLowerCase() == email.toLowerCase());
}

function criarPersonal(usuario, telefone, registroProfissional) {
    let novoPersonal = {
        idPersonal: crypto.randomUUID(),
        usuario: usuario,
        nome: usuario.nome,
        email: usuario.login,
        telefone: telefone,
        registroProfissional: registroProfissional,
        sobreMim: ''
    }
    base.dados.personalTrainers.push(novoPersonal);
    return novoPersonal;
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

function salvarAlteracaoDeDados(nutricionista, nome, email, telefone, registroProfissional, status) {
    if (nome != undefined && nome != null && nome != "") {
        nutricionista.nome = nome;
        nutricionista.usuario.nome = nome;
    }

    if(email != undefined && email != null && email != "" ) {
        nutricionista.email = email;
        nutricionista.usuario.login = email;
    }

    if(telefone != undefined && telefone != null && telefone != "") {
        nutricionista.telefone = telefone;
    } 

    if(registroProfissional != undefined && registroProfissional != null && registroProfissional != "") {
        nutricionista.registroProfissional = registroProfissional;
    }

    if (typeof (status) == 'boolean') {
        nutricionista.bloqueado = status;
        nutricionista.usuario.bloqueado = status;
    }


}

function salvarAlteracaoDoPerfil(personal, imagem, telefone) {

    if (imagem != undefined && imagem != null && imagem != "") {
        personal.usuario.imagem = imagem;
    }
    
    if(telefone != undefined && telefone != null && telefone != '') {
        personal.telefone = telefone;
    }

}

function salvarNovaSenha(personal, senha) {
    
    if(senha != undefined && senha != null && senha != '') {
        personal.usuario.senha = senha;
    }
}

function salvarAlteraçõesSobreMim(personal, texto) {
    personal.sobreMim = texto;
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
    criarPersonal: criarPersonal,
    buscarPersonalPorFiltro: buscarPersonalPorFiltro,
    buscarPersonalPorId: buscarPersonalPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarAlteracaoDoPerfil: salvarAlteracaoDoPerfil,
    salvarNovaSenha: salvarNovaSenha,
    salvarAlteraçõesSobreMim: salvarAlteraçõesSobreMim,
    buscarAlunosPorFiltro:  buscarAlunosPorFiltro,

};