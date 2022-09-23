const base = require('../dados');
const crypto = require('crypto');


function buscarNutricionistaPorEmail(email) {
    return base.dados.nutricionistas.find(nutri => nutri.email.toLowerCase() == email.toLowerCase());
}

function criarNutricionista(usuario, telefone, registroProfissional) {
    let novoNutricionista = {
        idNutri: crypto.randomUUID(),
        usuario: usuario,
        nome: usuario.nome,
        email: usuario.login,
        telefone: telefone,
        registroProfissional: registroProfissional,
        sobreMim: ''
    }
    base.dados.nutricionistas.push(novoNutricionista);
    return novoNutricionista;
}

function buscarNutricionistasPorFiltro(nome) {
    if (!nome) {
        return base.dados.nutricionistas;
    } else {
        return base.dados.nutricionistas.filter(nutri => nutri.nome.toLowerCase() == nome.toLowerCase());

    }
}

function buscarNutriPorId(id) {
    return base.dados.nutricionistas.find(nutri => nutri.idNutri == id);
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

function salvarAlteracaoDoPerfil(nutricionista, imagem, telefone) {

    if (imagem != undefined && imagem != null && imagem != "") {
        nutricionista.usuario.imagem = imagem;
    }
    
    if(telefone != undefined && telefone != null && telefone != '') {
        nutricionista.telefone = telefone;
    }

}

function salvarNovaSenha(nutricionista, senha) {
    
    if(senha != undefined && senha != null && senha != '') {
        nutricionista.usuario.senha = senha;
    }
}

function salvarAlteraçõesSobreMim(nutricionista, texto) {
    nutricionista.sobreMim = texto;
}



function buscarPacientesPorFiltro(nome, idNutri) {
    if(!nome) {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == idNutri);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == idNutri && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function buscarPacientePorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
}

function salvarDieta(pacienteEncontrado, dietaNome, dataInicio, dataFim, objetivo, cafeDaManha, lancheDaManha, almoco, lancheDaTarde, jantar, ceia) {
    let novaDieta = {
        idDieta: crypto.randomUUID(),
        ativo: true,
        dietaNome: dietaNome,
        dataInicio: dataInicio,
        dataFim: dataFim,
        objetivo: objetivo,
        cafeDaManha: cafeDaManha,
        lancheDaManha: lancheDaManha,
        almoco: almoco,
        lancheDaTarde: lancheDaTarde,
        jantar: jantar,
        ceia: ceia
    }

    pacienteEncontrado.dietas.push(novaDieta);
    return novaDieta;
}

function buscarDietaPorId(pacienteEncontrado, idDieta) {
    return pacienteEncontrado.dietas.find(dieta => dieta.idDieta == idDieta);
}



module.exports = {
    buscarNutricionistaPorEmail: buscarNutricionistaPorEmail,
    criarNutricionista: criarNutricionista,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    buscarNutriPorId: buscarNutriPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarAlteracaoDoPerfil: salvarAlteracaoDoPerfil,
    salvarNovaSenha: salvarNovaSenha,
    salvarAlteraçõesSobreMim: salvarAlteraçõesSobreMim,
    buscarPacientesPorFiltro:  buscarPacientesPorFiltro,
    buscarPacientePorId: buscarPacientePorId,
    salvarDieta: salvarDieta,
    buscarDietaPorId: buscarDietaPorId,

};