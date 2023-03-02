const geradorDeSenha = require('generate-password');
const crypto = require('crypto');


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

        throw { mensagem: "Não é possível redefinir senha sem a senha atual", interna: true }
    }

    if(!novaSenha) {

        throw { mensagem: "Não é possível redefinir senha a nova senha", interna: true }
    }
}

function validarAlteracaoDaImagem(files, tipoDaImagem) {
    if(!files) {
        
        throw { mensagem: "Não é possível usar uma foto vazia", interna: true }
    }

    if(tipoDaImagem !== "jpg" && tipoDaImagem !== "png" && tipoDaImagem && "gif" && tipoDaImagem !== "jpeg") {
        
        throw { mensagem: "Formato da imagem incorreto. Formatos validos: .jpg, .png, .gif e .jpeg", interna: true }
    }
}

module.exports = {
    Usuario: Usuario,
    validarAlteracaoDeSenha: validarAlteracaoDeSenha,
    validarAlteracaoDaImagem: validarAlteracaoDaImagem
};