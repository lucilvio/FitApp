const Usuario = require('../model/usuario');

function Nutricionista(nome, email, telefone, registroProfissional) {
    if (!nome) {
        throw { mensagem: "Não é possível cadastrar Nutricionista sem o nome", interna: true };
    }

    if (!email) {
        throw { mensagem: "Não é possível cadastrar Nutricionista sem e-mail", interna: true };
    }

    if (!telefone) {
        throw { mensagem: "Não é possível cadastrar Nutricionista sem telefone", interna: true };
    }

    if (!registroProfissional) {
        throw { mensagem: "Não é possível cadastrar Nutricionista sem o Registro Profissional", interna: true };
    }

    this.usuario = new Usuario.Usuario(nome, email, 'nutricionista');
    this.idNutri = this.usuario.idUsuario;
    this.imagem = this.usuario.imagem;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.registroProfissional = registroProfissional;
    this.sobreMim = "";

    
    this.alterarDadosDoPerfil = function (telefone, imagem) {
        if (imagem != undefined && imagem != null && imagem != "") {
            this.usuario.imagem = imagem;
        }

        if (telefone != undefined && telefone != null && telefone != '') {
            this.telefone = telefone;
        }
    }

    this.alterarSenha = function (senha) {
        if (senha != undefined && senha != null && senha != '') {
            this.usuario.senha = senha;
        }

    }

    this.alterarSobreMim = function (texto) {
        this.sobreMim = texto;
    }


}



module.exports = {
    Nutricionista: Nutricionista
}