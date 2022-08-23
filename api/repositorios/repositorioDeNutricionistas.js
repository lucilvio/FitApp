const base = require('../dados.js');

function buscarNutricionistaPorEmail(email) {
    return base.dados.nutricionistas.find(nutri => nutri.email.toLowerCase() == email.toLowerCase());
}

function salvarDadosDoNutri(novoNutricionista) {
    base.dados.nutricionistas.push(novoNutricionista);
}

function buscarNutricionistasPorFiltro(nome) {
    if(!nome) {
        return base.dados.nutricionistas;
    } else {
        return base.dados.nutricionistas.find(nutri => nutri.nome.toLowerCase() == nome.toLowerCase());
        
    }
}

module.exports = {
    buscarNutricionistaPorEmail: buscarNutricionistaPorEmail,
    salvarDadosDoNutri: salvarDadosDoNutri,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    
};