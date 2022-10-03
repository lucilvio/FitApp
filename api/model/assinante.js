const Usuario = require('../model/usuario');
const crypto = require('crypto');

function Assinante(nome, email, idPlano, idNutri, idPersonal) {
    if (!nome) {
        throw { mensagem: "Não é possível cadastrar Assinante sem o nome", interna: true };
    }
    if (!email) {
        throw { mensagem: "Não é possível cadastrar Assinante sem e-mail", interna: true };
    }

    if (!idPlano) {
        throw { mensagem: "Não é possível cadastrar Assinante sem plano", interna: true };
    }

    if (!idNutri) {
        throw { mensagem: "Não é possível cadastrar Assinante sem nutricionista", interna: true };
    }

    if (!idPersonal) {
        throw { mensagem: "Não é possível cadastrar Assinante sem personal trainer", interna: true };
    }

    this.usuario = new Usuario(nome, email, 'assinante');
    this.idAssinante = this.usuario.idUsuario;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = '';
    this.sexo = '';
    this.altura = 0;
    this.assinatura = new Assinatura(idPlano);
    this.nutricionista = idNutri;
    this.idPersonal = idPersonal;
    this.objetivo = '';
    this.dietas = [];
    this.treinos = [];
    this.medidas = [];

    function Assinatura(idPlano) {
        this.idAssinatura = crypto.randomUUID();
        this.idPlano = idPlano;
    }

    this.adicionarDieta = function (nomeDieta, dataInicio, dataFim, objetivo, itens) {
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

        this.dietas.push({
            idDieta: crypto.randomUUID(),
            ativo: true,
            nomeDieta: nomeDieta,
            dataInicio: dataInicio,
            dataFim: dataFim,
            objetivo: objetivo,
            itens: itens
        })
    }

    this.alterarStatus = function (novoStatus) {

        if (!novoStatus) {
            throw { mensagem: "Não é possível alterar o status sem informação", interna: true };
        }
        
        this.usuario.bloqueado = novoStatus;
    }

    this.adicionarTreino = function (nomeTreino, dataInicio, dataFim, objetivo, exercicios) {
        if (!nomeTreino) {
            throw { mensagem: "Não é possível criar treino sem nome", interna: true };
        }

        if (!dataInicio) {
            throw { mensagem: "Não é possível criar treino a data de inicio", interna: true };
        }

        if (!dataFim) {
            throw { mensagem: "Não é possível criar treino sem a data do fim", interna: true };
        }

        if (!objetivo) {
            throw { mensagem: "Não é possível criar treino sem o objetivo", interna: true };
        }

        this.dietas.push({
            idTreino: crypto.randomUUID(),
            ativo: true,
            nomeTreino: nomeTreino,
            dataInicio: dataInicio,
            dataFim: dataFim,
            objetivo: objetivo,
            exercicios: exercicios
        })
    }

}

module.exports = Assinante

