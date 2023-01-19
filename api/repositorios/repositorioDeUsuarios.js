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

function salvarFotoUsuario(idUsuario, foto) {
    const usuarioEncontrado = buscarUsuarioPorId(idUsuario);
    usuarioEncontrado.imagem = foto;
}

function salvarNovaSenha(idUsuario, novaSenha) {
    const usuarioEncontrado = buscarUsuarioPorId(idUsuario);
    usuarioEncontrado.senha = novaSenha;
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
    salvarNovaSenha: salvarNovaSenha,
    salvarFotoUsuario: salvarFotoUsuario,
    salvarMensagens: salvarMensagens,
    buscarAdmin: buscarAdmin
};