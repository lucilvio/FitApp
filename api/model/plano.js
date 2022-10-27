const crypto = require('crypto');

function Plano(nome, valor, duracao, descricao) {
    if (!nome) {
        throw { mensagem: "Não é possível cadastrar Plano sem o nome", interna: true };
    }

    if (!valor == undefined || valor < 0) {
        throw { mensagem: "Não é possível cadastrar Plano sem valor", interna: true };
    }

    if (!duracao == undefined || duracao < 0) {
        throw { mensagem: "Não é possível cadastrar Plano sem duração", interna: true };
    }

    if (!descricao) {
        throw { mensagem: "Não é possível cadastrar Plano sem descrição", interna: true };
    }

    this.idPlano = crypto.randomUUID();
    this.nome = nome;
    this.valor = valor;
    this.duracao = duracao;
    this.descricao = descricao;
    this.bloqueado = false;

    this.alterarDadosDoPlano = function (novoNome, novoValor,novaDuracao, novaDescricao, novoStatus) {
        if (novoNome != undefined && novoNome != null && novoNome != "") {
            this.nome = novoNome;
        }

        if (novoValor != undefined && novoValor != null && novoValor != "" && novoValor >= 0) {
            this.valor = novoValor;
        }

        if (novaDuracao != undefined && novaDuracao != null && novaDuracao != "" && novaDuracao >= 0) {
            this.duracao = novaDuracao;
        }

        if (novaDescricao != undefined && novaDescricao != null && novaDescricao != "") {
            this.descricao = novaDescricao;
        }

        if (typeof (novoStatus) == 'boolean') {
            this.bloqueado = novoStatus;
        }
    }
}

module.exports = Plano