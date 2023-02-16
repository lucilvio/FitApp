const crypto = require('crypto');

function Medidas(peso, pescoco, cintura, quadril) {
    this.idMedidas = crypto.randomUUID();
    this.data = new Date();
    this.peso = peso;
    this.pescoco = pescoco;
    this.cintura = cintura;
    this.quadril = quadril;
}

function validarInsercaoDeMedidas (peso, pescoco, cintura, quadril) {

    if(peso == 0 && pescoco == 0 && cintura == 0 && quadril == 0) {
        throw { mensagem: "Pelo menos uma das medidas deve ser informada", interna: true };
    }
    
}

module.exports = {
    Medidas: Medidas,
    validarInsercaoDeMedidas: validarInsercaoDeMedidas
}