const base = require('../dados');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');

function buscarUsuarioPorLogin(login) {
    return base.dados.usuarios.find(usuario => usuario.login.toLowerCase() == login.toLowerCase());

}

function criarUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}


function buscarUsuarioPorId(id) {
    return base.dados.usuarios.find(usuario => usuario.id == id);
}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,
    criarUsuario: criarUsuario,
    buscarUsuarioPorId: buscarUsuarioPorId
};