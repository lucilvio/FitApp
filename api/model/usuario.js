const geradorDeSenha = require('generate-password');
const crypto = require('crypto');
const Mensagem = require('./mensagem');

function Usuario(nome, login, perfil){

    if(!login){
        throw "Não é possível cadastrar Usuario sem login";
    }
    
    this.idUsuario = crypto.randomUUID();
    this.nome = nome;
    this.login = login;
    this.imagem = "";
    this.bloqueado = false;
    this.perfil = perfil;

    const senha = geradorDeSenha.generate({
        length: 10,
        numbers: true
    });

    this.senha = senha;
    this.mensagens = [];
}

module.exports = Usuario;