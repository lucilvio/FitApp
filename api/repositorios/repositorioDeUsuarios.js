const base = require('../dados');

function buscarUsuarioPorLogin(login) {
    return base.dados.usuarios.find(usuario => usuario.login.toLowerCase() == login.toLowerCase());

}

function salvarDadosDoUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}

function buscarUsuarioPorId(id) {
    return base.dados.usuarios.find(usuario => usuario.id == id);
}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,
    salvarDadosDoUsuario: salvarDadosDoUsuario,
    buscarUsuarioPorId: buscarUsuarioPorId
};