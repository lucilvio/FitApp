const crypto = require('crypto');

function Assinatura(idPlano) {
    if (!idPlano) {
        throw { mensagem: "Não é possível criar assinatura sem o Id do Plano", interna: true };
    }

    this.idAssinatura = crypto.randomUUID();
    this.idPlano = idPlano;
    this.bloqueado = false;
    //this.dataInicio = ;
    //this.dataFim =  ;

    
}

module.exports = Assinatura;