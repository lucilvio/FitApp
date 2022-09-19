const base = require('../dados');


function buscarNutricionistaPorEmail(email) {
    return base.dados.nutricionistas.find(nutri => nutri.email.toLowerCase() == email.toLowerCase());
}

function salvarDadosDoNutri(novoNutricionista) {
    base.dados.nutricionistas.push(novoNutricionista);
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

function buscarPacientesPorFiltro(nome, idNutri) {
    if(!nome) {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == idNutri);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == idNutri && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}



module.exports = {
    buscarNutricionistaPorEmail: buscarNutricionistaPorEmail,
    salvarDadosDoNutri: salvarDadosDoNutri,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    buscarNutriPorId: buscarNutriPorId,
    buscarPacientesPorFiltro:  buscarPacientesPorFiltro,
    

};