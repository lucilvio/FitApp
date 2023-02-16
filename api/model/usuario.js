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

function validarAlteracaoDeSenha(senhaAtual, novaSenha) {
    if(!senhaAtual) {
        res.status(400).send({ erro: "Não é possível redefinir senha sem a senha atual"});
        return;
    }

    if(!novaSenha) {
        res.status(400).send({ erro: "Não é possível redefinir senha a nova senha"});
        return;
    }
}

function validarAlteracaoDaImagem(files) {
    if(!files) {
        res.status(400).send({ erro: "Não é possível usar uma foto vazia"});
        return;
    }
}

module.exports = {
    Usuario: Usuario,
    validarAlteracaoDeSenha: validarAlteracaoDeSenha,
    validarAlteracaoDaImagem: validarAlteracaoDaImagem
};