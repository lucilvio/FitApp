const base = require('../dados');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');

function buscarUsuarioPorLogin(login) {
    return base.dados.usuarios.find(usuario => usuario.login.toLowerCase() == login.toLowerCase());

}

function criarUsuario(nome, email, perfil) {
    let novoUsuario = {
        idUsuario: crypto.randomUUID(),
        nome: nome,
        login: email,
        senha: geradorDeSenha.generate({
            length: 10,
            numbers: true
        }),
        bloqueado: false,
        perfil: perfil,
        imagem: ''
    }
    base.dados.usuarios.push(novoUsuario);
    return novoUsuario;
}


function buscarUsuarioPorId(id) {
    return base.dados.usuarios.find(usuario => usuario.id == id);
}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,
    criarUsuario: criarUsuario,
    buscarUsuarioPorId: buscarUsuarioPorId
};