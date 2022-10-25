const base = require('../dados');
const { perfil } = require('../model/perfis');

function buscarUsuarioPorLogin(login) {
    return base.dados.usuarios.find(usuario => usuario.login.toLowerCase() == login.toLowerCase());

}

function criarUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}


function buscarUsuarioPorId(idUsuario) {
    return base.dados.usuarios.find(usuario => usuario.idUsuario == idUsuario);
}

function salvarMensagens(usuario) {
    let usuarioEncontrado = buscarUsuarioPorId(usuario.idUsuario);
    usuarioEncontrado = usuario;

}

function buscarAdmin() {
    return base.dados.usuarios.find(usuario => usuario.perfil == perfil.administrador)
}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,
    criarUsuario: criarUsuario,
    buscarUsuarioPorId: buscarUsuarioPorId,
    salvarMensagens: salvarMensagens,
    buscarAdmin: buscarAdmin
};