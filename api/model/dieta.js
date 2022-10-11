const crypto = require('crypto');

function Dieta(idAssinante, idNutricionista, nomeDieta, dataInicio, dataFim, objetivo, itens) {
    if (!nomeDieta) {
        throw { mensagem: "Não é possível criar dieta sem nome", interna: true };
    }

    if (!dataInicio) {
        throw { mensagem: "Não é possível criar dieta a data de inicio", interna: true };
    }

    if (!dataFim) {
        throw { mensagem: "Não é possível criar dieta sem a data do fim", interna: true };
    }

    if (!objetivo) {
        throw { mensagem: "Não é possível criar dieta sem o objetivo", interna: true };
    }

    this.idDieta = crypto.randomUUID();
    this.idAssinante = idAssinante;
    this.idNutricionista = idNutricionista;
    this.ativo = true;
    this.nomeDieta = nomeDieta;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.objetivo = objetivo;
    this.itens = [];

    itens.forEach(item => {
        this.itens.push(new ItemDaDieta(this.idDieta, item.descricao, item.refeicao));
    });


    this.alterarDadosDaDieta = function (idDieta, nomeDieta, dataInicio, dataFim, objetivo, itens) {
        this.itens = [];

        if (nomeDieta != undefined && nomeDieta != null && nomeDieta != "") {
            this.nomeDieta = nomeDieta;
        }

        if (dataInicio != undefined && dataInicio != null && dataInicio != "") {
            this.dataInicio = dataInicio;
        }

        if (dataFim != undefined && dataFim != null && dataFim != "") {
            this.dataFim = dataFim;
        }

        if (objetivo != undefined && objetivo != null && objetivo != "") {
            this.objetivo = objetivo;
        }

        if (itens != undefined && itens != null && itens != "") {
            itens.forEach(item => {
                this.itens.push(new ItemDaDieta(idDieta, item.descricao, item.refeicao));
            });
           
        }

    }
}

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
    this.descricao = descricao;
    this.refeicao = refeicao;
}

module.exports = Dieta
