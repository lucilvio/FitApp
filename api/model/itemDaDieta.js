const crypto = require('crypto');

function ItemDaDieta(idDieta, descricao, refeicao) {
    if (!idDieta) {
        throw { mensagem: "Não é possível adicionar item sem o id da dieta", interna: true };
    }

    if (!descricao) {
        throw { mensagem: "Não é possível adicionar item sem descrição", interna: true };
    }

    if (!refeicao) {
        throw { mensagem: "Não é possível adicionar item sem a refeição", interna: true };
    }

    this.idDieta = idDieta;
    this.idItemDieta = crypto.randomUUID();
    this.descricao = descricao;
    this.refeicao = refeicao;
}

module.exports = {
    ItemDaDieta: ItemDaDieta
}