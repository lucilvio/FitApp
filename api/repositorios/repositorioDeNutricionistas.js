const base = require('../dados.js');

function buscarNutricionistaPorEmail(email) {
    return base.dados.personalTrainers.find(nutri => nutri.email.toLowerCase() == email.toLowerCase());
}

function salvarDadosDoNutri(novoNutricionista) {
    base.dados.personalTrainers.push(novoNutricionista);
}

function buscarNutricionistasPorFiltro(nome) {
    if(!nome) {
        return base.dados.personalTrainers;
    } else {
        return base.dados.personalTrainers.filter(nutri => nutri.nome.toLowerCase() == nome.toLowerCase());
        
    }
}

module.exports = {
    buscarNutricionistaPorEmail: buscarNutricionistaPorEmail,
    salvarDadosDoNutri: salvarDadosDoNutri,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    
};