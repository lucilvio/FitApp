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

    this.usuario = new Usuario.Usuario(nome, email, 'assinante');
    this.idAssinante = this.usuario.idUsuario;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = '';
    this.sexo = '';
    this.altura = 0;
    this.nutricionista = idNutri;
    this.personalTrainer = idPersonal;
    this.objetivo = '';
    this.assinatura = new Assinatura(this.idAssinante, plano);
    this.dietas = [];
    this.treinos = [];
    this.medidas = [];

   

    this.dietaAtual = function () {
        return this.dietas.find(dieta => dieta.ativo == true);
    }

    this.treinoAtual = function () {
        return this.treinos.find(treino => treino.ativo == true);
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


    this.inserirDieta = function (dieta) {
        this.dietas.forEach(dieta => dieta.ativo = false);

        this.dietas.push(dieta);
    }

    this.inserirTreino = function (treino) {
        this.treinos.forEach(treino => treino.ativo = false);
        this.treinos.push(treino);
    }


}

function validarAlteracaoDoPerfil(nome) {
    if (!nome) {
        throw { mensagem: "O nome do assinante precisa ser definido", interna: true };
    }
}

function validarAlteracaoDeStatus(novoStatus) {
    if (typeof (novoStatus) != 'boolean') {
        throw { mensagem: "O status do assinante precisa ser definido", interna: true };
    }
}






module.exports = {
    Assinante: Assinante,
    validarAlteracaoDoPerfil: validarAlteracaoDoPerfil,
    validarAlteracaoDeStatus: validarAlteracaoDeStatus
}

