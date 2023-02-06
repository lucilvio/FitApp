const Usuario = require('./usuario');
const Assinatura = require('./assinatura');
const Medidas = require('./medidas');

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

    this.dietaAtual = function () {
        return this.dietas.find(dieta => dieta.ativo == true);
    }

    this.treinoAtual = function () {
        return this.treinos.find(treino => treino.ativo == true);
    }

    this.medidasAtuais = function () {
        if (this.medidas.length == 0) {
            return new Medidas(0, 0, 0, 0);
        }

        const dataDaUltimaMedida = Math.max(...this.medidas.map(medida => new Date(medida.data)));
        return this.medidas.find(medida => medida.data.getTime() == dataDaUltimaMedida);
    }

    this.imc = function () {
        const medidas = this.medidasAtuais();

        if (medidas.peso == 0) {
            return 0;
        }

        if (this.altura == 0) {
            return 0;
        }

        const alturaConvertida = (this.altura * this.altura) / 100;

        return medidas.peso / alturaConvertida;
    }

    this.idade = function () {
        if (!this.dataNascimento) {
            return 0;
        }

        const dataAtual = new Date().getTime();
        const dataSubtraidaEmMilessegundos = dataAtual - this.dataNascimento
        return Math.floor(dataSubtraidaEmMilessegundos / 31536000000);
    }

    this.alterarStatus = function (novoStatus) {

        if (typeof (novoStatus) == 'boolean') {
            this.usuario.bloqueado = novoStatus;
        }
    }

    this.alterarDadosDoPerfil = function (nome, imagem, dataNascimento, sexo, altura) {
        if (nome != undefined && nome != null && nome != "") {
            this.usuario.nome = nome;
            this.nome = nome;
        }

        if (imagem != undefined && imagem != null && imagem != "") {
            this.usuario.imagem = imagem;
        }

        if (dataNascimento != undefined && dataNascimento != null && dataNascimento != "") {
            this.dataNascimento = Date.parse(dataNascimento);
        }

        if (sexo != undefined && sexo != null && sexo != "") {
            this.sexo = sexo;
        }

        if (altura != undefined && altura != null && altura != "") {
            this.altura = altura;
        }
    }

    this.alterarSenha = function (senhaAtual, novaSenha) {
        if (senhaAtual == this.usuario.senha) {
            if (novaSenha != undefined && novaSenha != null && novaSenha != '') {
                this.usuario.senha = novaSenha;
            }
        } else {
            throw { mensagem: "Senha atual incorreta", interna: true };
        }
    }


    this.cancelarAssinatura = function (idAssinatura) {
        const assinaturaEncontrada = this.assinaturas.find(assinatura => assinatura.idAssinatura == idAssinatura);

        if (!assinaturaEncontrada) {

            throw { mensagem: "Assinatura não encontrada", interna: true };
        }

        assinaturaEncontrada.bloqueado = true;
        this.usuario.bloqueado = true;
    }

    this.alterarPlanoDaAssinatura = function (idAssinatura, novoPlano) {
        if (!novoPlano) {

            throw { mensagem: "Plano não definido", interna: true };
        }

        const assinaturaEncontrada = this.assinaturas.find(assinatura => assinatura.idAssinatura == idAssinatura);

        if (!assinaturaEncontrada) {

            throw { mensagem: "Assinatura não encontrada", interna: true };
        }

        assinaturaEncontrada.alterarPlano(novoPlano);
    }

    this.inserirMedidas = function (medidas) {
        const medidasAtuais = this.medidasAtuais();

        if (!medidas) {
            throw { mensagem: "Medidas não definidas", interna: true };
        }

        if (!medidas.peso) {
            medidas.peso = medidasAtuais.peso;
        }

        if (!medidas.pescoco) {
            medidas.pescoco = medidasAtuais.pescoco;
        }

        if (!medidas.cintura) {
            medidas.cintura = medidasAtuais.cintura;
        }

        if (!medidas.quadril) {
            medidas.quadril = medidasAtuais.quadril;
        }

        if(medidas.peso == 0 && medidas.pescoco == 0 && medidas.cintura == 0 && medidas.quadril == 0) {
            throw { mensagem: "Pelo menos uma das medidas deve ser informada", interna: true };
        }

        this.medidas.push(medidas);
    }

    this.inserirDieta = function (dieta) {
        this.dietas.forEach(dieta => dieta.ativo = false);

        this.dietas.push(dieta);
    }

    this.inserirTreino = function (treino) {
        this.treinos.forEach(treino => treino.ativo = false);
        this.treinos.push(treino);
    }

    this.excluirMedidas = function (idMedida) {
        const medidaEncontrada = this.medidas.find(medida => medida.idMedida == idMedida);

        if (!medidaEncontrada) {

            throw { mensagem: "Medida não encontrada", interna: true };
        }

        this.medidas = this.medidas.filter(medida => medida.idMedida != idMedida);
    }

}

module.exports = Assinante

