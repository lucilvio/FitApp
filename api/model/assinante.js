const Usuario = require('../model/usuario');
const crypto = require('crypto');

function Assinante(nome, email, assinatura, idNutri, idPersonal) {
    if (!nome) {
        throw { mensagem: "Não é possível cadastrar Assinante sem o nome", interna: true };
    }
    if (!email) {
        throw { mensagem: "Não é possível cadastrar Assinante sem e-mail", interna: true };
    }

    if (!assinatura) {
        throw { mensagem: "Não é possível cadastrar Assinante sem a Assinatura", interna: true };
    }

    if (!idNutri) {
        throw { mensagem: "Não é possível cadastrar Assinante sem nutricionista", interna: true };
    }

    if (!idPersonal) {
        throw { mensagem: "Não é possível cadastrar Assinante sem personal trainer", interna: true };
    }

    this.usuario = new Usuario(nome, email, 'assinante');
    this.idAssinante = this.usuario.idUsuario;
    this.imagem = this.usuario.imagem;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = '';
    this.sexo = '';
    this.altura = 0;
    this.assinaturas = [];
    this.nutricionista = idNutri;
    this.personalTrainer = idPersonal;
    this.objetivo = '';
    this.dietas = [];
    this.treinos = [];
    this.medidas = [];

    this.assinaturas.push(assinatura);
   


    function Medidas(peso, pescoco, cintura, quadril) {
        this.data = new Date();
        this.peso = peso;
        this.pescoco = pescoco;
        this.cintura = cintura;
        this.quadril = quadril;

    }

    this.alterarStatus = function (novoStatus) {

        if (!novoStatus) {
            throw { mensagem: "Não é possível alterar o status sem informação", interna: true };
        }

        this.usuario.bloqueado = novoStatus;
    }

    this.alterarDadosDoPerfil = function (imagem, dataNascimento, sexo, altura) {
        if (imagem != undefined && imagem != null && imagem != "") {
            this.usuario.imagem = imagem;
        }

        if (dataNascimento != undefined && dataNascimento != null && dataNascimento != "") {
            this.dataNascimento = dataNascimento;
        }

        if (sexo != undefined && sexo != null && sexo != "") {
            this.sexo = sexo;
        }

        if (altura != undefined && altura != null && altura != "") {
            this.altura = altura;
        }
    }

    this.alterarSenha = function (senha) {
        if (senha != undefined && senha != null && senha != '') {
            this.usuario.senha = senha;
        }

    }

   

}

module.exports = Assinante

