const base = require('../dados.js');

function buscarUsuarioPorLogin(login) {
    return base.dados.usuarios.find(usuario => usuario.login.toLowerCase() == login.toLowerCase());

}

function salvarDadosDoUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,
    salvarDadosDoUsuario: salvarDadosDoUsuario
};