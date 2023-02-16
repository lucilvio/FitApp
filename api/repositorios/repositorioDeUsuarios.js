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

async function buscarDadosDoUsuarioPorId(idUsuario) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select perfil, nome, login, senha, bloqueado, imagem 
        from usuarios 
        where idUsuario = ?`, [idUsuario]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

async function salvarNovaSenha(idUsuario, novaSenha) {
    const conexao = await baseDeDados.abrirConexao();

    await conexao.execute(
        `UPDATE usuarios
        SET senha = ?
        WHERE idUsuario = ?`, [novaSenha, idUsuario]);

    await conexao.end();
}

function criarUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}


function buscarDadosDoUsuario(idUsuario) {
    return base.dados.usuarios.find(usuario => usuario.idUsuario == idUsuario);
}

function salvarFotoUsuario(idUsuario, foto) {
    const usuarioEncontrado = buscarDadosDoUsuario(idUsuario);
    usuarioEncontrado.imagem = foto;
}



function salvarMensagens(usuario) {
    let usuarioEncontrado = buscarDadosDoUsuario(usuario.idUsuario);
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
    buscarDadosDoUsuarioPorId:buscarDadosDoUsuarioPorId,
    criarUsuario: criarUsuario,
    buscarDadosDoUsuario: buscarDadosDoUsuario,
    salvarNovaSenha: salvarNovaSenha,
    salvarFotoUsuario: salvarFotoUsuario,
    salvarMensagens: salvarMensagens,
    buscarAdmin: buscarAdmin
};