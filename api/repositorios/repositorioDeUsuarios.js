const base = require('../dados');
const { perfil } = require('../model/perfis');
const baseDeDados = require('../conexao');

async function buscarUsuarioPorLogin(login) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select idUsuario, perfil, nome, login, senha, bloqueado, imagem 
        from usuarios 
        where login = ?`, [login]);
        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function buscarDadosDoUsuarioPorId(idUsuario) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select perfil, nome, login, senha, bloqueado, imagem 
        from usuarios 
        where idUsuario = ?`, [idUsuario]);
        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function salvarNovaSenha(idUsuario, novaSenha) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.execute(
            `UPDATE usuarios
        SET senha = ?
        WHERE idUsuario = ?`, [novaSenha, idUsuario]);

    } finally {
        await conexao.end();
    }
}

async function salvarImagemDoUsuario(idUsuario, imagem) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.execute(
            `UPDATE usuarios
            SET imagem = ?
            WHERE idUsuario = ?`, [imagem, idUsuario]);

    } finally {
        await conexao.end();
    }


}

async function buscarAdmin() {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select idUsuario, perfil, nome, login, senha, bloqueado, imagem from usuarios where perfil = ?`, ['administrador']);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

function criarUsuario(novoUsuario) {
    base.dados.usuarios.push(novoUsuario);
}


function buscarDadosDoUsuario(idUsuario) {
    return base.dados.usuarios.find(usuario => usuario.idUsuario == idUsuario);
}




function salvarMensagens(usuario) {
    let usuarioEncontrado = buscarDadosDoUsuario(usuario.idUsuario);
    usuarioEncontrado = usuario;

}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,
    buscarDadosDoUsuarioPorId: buscarDadosDoUsuarioPorId,
    criarUsuario: criarUsuario,
    buscarDadosDoUsuario: buscarDadosDoUsuario,
    salvarNovaSenha: salvarNovaSenha,
    salvarImagemDoUsuario: salvarImagemDoUsuario,
    salvarMensagens: salvarMensagens,
    buscarAdmin: buscarAdmin
};