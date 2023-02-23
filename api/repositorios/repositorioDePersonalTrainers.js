const base = require('../dados');
const baseDeDados = require('../conexao');

async function buscarPersonalTrainersAtivos() {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select a.idPersonal, a.nome, a.sobreMim,
                    b.imagem 
            from personal_trainers as a
            inner join usuarios as b on a.idPersonal = b.idUsuario
            where b.bloqueado = false`);

        if (rows.length <= 0)
            return;

        return rows;

    } finally {
        await conexao.end();
    }
}

async function verificarSePersonalJaTemCadastro(email) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select idUsuario, login 
            from usuarios 
            where login = ?`, [email.toLowerCase()]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }

}

async function criarPersonal(novoPersonal) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const parametrosDoUsuario = [
            novoPersonal.usuario.idUsuario,
            novoPersonal.usuario.perfil,
            novoPersonal.usuario.nome,
            novoPersonal.usuario.login,
            novoPersonal.usuario.senha,
            novoPersonal.usuario.bloqueado
        ]

        const parametrosDoPersonal = [
            novoPersonal.idPersonal,
            novoPersonal.nome,
            novoPersonal.email,
            novoPersonal.telefone,
            novoPersonal.registroProfissional
        ]

        await conexao.beginTransaction();

        await conexao.execute(
            `insert into usuarios (idUsuario, perfil, nome, login, senha, bloqueado) 
            values (?, ?, ?, ?, ?, ?);`, parametrosDoUsuario);
        await conexao.execute(
            `insert into personal_trainers (idPersonal, nome, email, telefone, registroProfissional) 
            values (?, ?, ?, ?, ?);`, parametrosDoPersonal);

        await conexao.commit();

    } finally {
        await conexao.end();
    }
}

async function buscarPersonalTrainersPorFiltro(nome) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select a.idPersonal, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.bloqueado 
                from personal_trainers as a
                inner join usuarios as b on a.idPersonal = b.idUsuario`);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select a.idPersonal, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.bloqueado 
                from personal_trainers as a
                inner join usuarios as b on a.idPersonal = b.idUsuario
                where a.nome = ?`, [nome.toLowerCase()]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }
}

async function buscarPersonalPorId(idPersonal) {
    const conexao = await baseDeDados.abrirConexao();
    try {

        const [rows, fields] = await conexao.execute(
            `select a.idPersonal, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.imagem, b.bloqueado 
        from personal_trainers as a
        inner join usuarios as b on a.idPersonal = b.idUsuario
        where a.idPersonal = ?`, [idPersonal]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function salvarAlteracaoDeDados(idPersonal, nome, email, telefone, registroProfissional, bloqueado) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.beginTransaction();

        await conexao.execute(
            `update usuarios
            set nome = ?, login = ?, bloqueado = ?
            where idUsuario = ?`, [nome, email, bloqueado, idPersonal]);

        await conexao.execute(
            `update personal_trainers
            set nome = ?, email = ?, telefone = ?, registroProfissional = ?
            where idPersonal = ?`, [nome, email, telefone, registroProfissional, idPersonal]);

        await conexao.commit();

    } finally {
        await conexao.end();
    }
}

async function salvarAlteracaoDeDadosDoPerfil(idUsuario, nome, telefone) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        await conexao.beginTransaction();
        await conexao.execute(
            `update usuarios
            set nome = ?
            where idUsuario = ?`, [nome, idUsuario]);

        await conexao.execute(
            `update personal_trainers
            set nome = ?, telefone = ?
            where idPersonal = ?`, [nome, telefone, idUsuario]);

        await conexao.commit();

    }
    finally {
        await conexao.end();
    }
}

async function salvarAlteracaoSobreMim(idUsuario, texto) {
    const conexao = await baseDeDados.abrirConexao();

    try {

        await conexao.execute(
            `update personal_trainers
            set sobreMim = ?
            where idPersonal = ?`, [texto, idUsuario]);

    }
    finally {
        await conexao.end();
    }
}

async function buscarAlunosPorFiltro(idUsuario, nome) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select	a.idAssinante, a.nome, 
                        b.objetivo	
                from assinantes as a
                    left join treinos as b on b.idPersonal = a.idPersonal 
                        and b.data = (select max(b.data) data 
                        from treinos as b where b.idPersonal = ? and b.idAssinante = a.IdAssinante)
                where a.idPersonal = ?`, [idUsuario, idUsuario]);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select	a.idAssinante, a.nome, 
                    b.objetivo	
            from assinantes as a
                left join treinos as b on b.idPersonal = a.idPersonal 
                    and b.data = (select max(b.data) data 
                    from treinos as b where b.idPersonal = ? and b.idAssinante = a.IdAssinante)
            where a.idPersonal = ? and a.nome like ?`, [idUsuario, idUsuario, `%${nome}%`]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }
}

async function buscarAlunoPorId(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select a.imagem,
                    b.nome, b.idSexo, b.dataNascimento, b.altura, b.idPersonal 
            from usuarios as a
            inner join assinantes as b on a.idUsuario = b.idAssinante
            where a.idUsuario = ?`, [idAssinante]);

        if (rows.length <= 0)
            return;

        const [medidasAtuais, fieldsMedidasAtuais] = await conexao.execute(
            `select peso, pescoco, cintura, quadril
            from medidas
            where idAssinante = ?
            order by data desc limit 1`, [idAssinante]);

        const [treinos, fieldsTreinos] = await conexao.execute(
            `select idTreino, dataInicio, dataFim, objetivo
                from treinos
                where idAssinante = ?
                order by data desc`, [idAssinante]);

        return {
            dados: rows[0],
            medidasAtuais: medidasAtuais[0],
            treinos: treinos
        }

    } finally {
        await conexao.end();
    }
}

module.exports = {
    buscarPersonalTrainersAtivos: buscarPersonalTrainersAtivos,
    verificarSePersonalJaTemCadastro: verificarSePersonalJaTemCadastro,
    criarPersonal: criarPersonal,
    buscarPersonalTrainersPorFiltro: buscarPersonalTrainersPorFiltro,
    buscarPersonalPorId: buscarPersonalPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarAlteracaoDeDadosDoPerfil: salvarAlteracaoDeDadosDoPerfil,
    salvarAlteracaoSobreMim: salvarAlteracaoSobreMim,
    buscarAlunosPorFiltro: buscarAlunosPorFiltro,
    buscarAlunoPorId: buscarAlunoPorId
};