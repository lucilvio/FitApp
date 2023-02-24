const crypto = require('crypto');

function Assinatura(idAssinante, plano) {
    if (!idAssinante) {
        throw { mensagem: "Não é possível criar assinatura sem o Id do Assinante", interna: true };
    }
    if (!plano) {
        throw { mensagem: "Não é possível criar assinatura sem Plano", interna: true };
    }
    this.idAssinante = idAssinante;
    this.idAssinatura = crypto.randomUUID();
    this.idPlano = plano.idPlano;
    this.bloqueado = false;

    this.dataInicio = new Date();
    this.dataFim = new Date();
    this.dataFim.setDate(this.dataInicio.getDate() + plano.duracao);


}

module.exports = {
    Assinatura: Assinatura
}
