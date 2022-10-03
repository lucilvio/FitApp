const geradorDeSenha = require('generate-password');
const crypto = require('crypto');

function Usuario(nome, login, perfil){

    if(!login){
        throw "Não é possível cadastrar Usuario sem login";
    }


    this.idUsuario = crypto.randomUUID();
    this.nome = nome;
    this.login = login;
    this.bloqueado = false;
    this.perfil = perfil;

    const senha = geradorDeSenha.generate({
        length: 10,
        numbers: true
    });

    this.senha = senha;
}

module.exports = Usuario;