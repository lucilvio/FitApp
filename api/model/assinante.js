const Usuario = require('./usuario');
const Assinatura = require('./assinatura');

function Assinante(nome, email, plano, idNutri, idPersonal) {
    if (!nome) {
        throw { mensagem: "Não é possível cadastrar Assinante sem o nome", interna: true };
    }
    if (!email) {
        throw { mensagem: "Não é possível cadastrar Assinante sem e-mail", interna: true };
    }

    if (!plano) {
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

    this.assinaturas.push(new Assinatura(this.idAssinante, plano));



    function Medidas(peso, pescoco, cintura, quadril) {
        this.data = new Date();
        this.peso = peso;
        this.pescoco = pescoco;
        this.cintura = cintura;
        this.quadril = quadril;

    }

    this.alterarStatus = function (novoStatus) {

        if (typeof (novoStatus) == 'boolean') {
            this.usuario.bloqueado = novoStatus;
        }
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

    this.cancelarAssinatura = function (idAssinatura) {
        const assinaturaEncontrada = this.assinaturas.find(assinatura => assinatura.idAssinatura == idAssinatura);

        if(!assinaturaEncontrada) {

            throw { mensagem: "Assinatura não encontrada", interna: true };
        }

        assinaturaEncontrada.bloqueado = true;
        this.usuario.bloqueado = true;
    }

    this.alterarPlanoDaAssinatura = function (idAssinatura, novoPlano) {
        if(!novoPlano) {

            throw { mensagem: "Plano não definido", interna: true };
        }

        const assinaturaEncontrada = this.assinaturas.find(assinatura => assinatura.idAssinatura == idAssinatura);

        if(!assinaturaEncontrada) {

            throw { mensagem: "Assinatura não encontrada", interna: true };
        }

        assinaturaEncontrada.alterarPlano(novoPlano);
    }

}

module.exports = Assinante

