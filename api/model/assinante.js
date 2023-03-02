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
    this.assinatura = new Assinatura.Assinatura(this.idAssinante, plano);

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

