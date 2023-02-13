const base = require('../dados');
const { perfil } = require('../model/perfis');
const baseDeDados = require('../conexao');

async function buscarUsuarioPorLogin(login) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select idUsuario, perfil, nome, login, senha, bloqueado, imagem from usuarios where login = ?`, [login]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

function criarUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}


async function buscarUsuarioPorId(idUsuario) {
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

async function buscarAdmin() {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select idUsuario, perfil, nome, login, senha, bloqueado, imagem from usuarios where perfil = ?`, ['administrador']);

    if (rows.length <= 0)
        return;

    return rows[0];
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