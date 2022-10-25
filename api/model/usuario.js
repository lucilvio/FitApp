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

    // this.enviarMensagem = function (idUsuarioDestinatario, assunto, texto) {
    //     const mensagem = new Mensagem(this.idUsuario, idUsuarioDestinatario, assunto, texto);
    //     this.mensagens.push(mensagem)
    // }

    // this.excluirMensagem = function (idMensagem) {
    //     const mensagemEncontrada = this.mensagens.find(mensagem => mensagem.idMensagem == idMensagem);
    //     mensagemEncontrada.excluida = false;
    // }

    // this.responderMensagem = function (idMensagem, texto) {
    //     const mensagemEncontrada = this.mensagens.find(mensagem => mensagem.idMensagem == idMensagem);
    //     const mensagemResposta = new Mensagem(this.idUsuario, mensagemEncontrada.idUsuarioRemetente, mensagemEncontrada.assunto, texto);


    // }
}

module.exports = Usuario;