const crypto = require('crypto');

function Medidas(peso, pescoco, cintura, quadril) {
    this.idMedida = crypto.randomUUID();
    this.data = new Date();
    this.peso = peso;
    this.pescoco = pescoco;
    this.cintura = cintura;
    this.quadril = quadril;
}

module.exports = Medidas;