const base = require('../dados');
const baseDeDados = require('../conexao');

async function buscarNutricionistasAtivos() {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select a.idNutri, a.nome, a.sobreMim,
                    b.imagem 
            from nutricionistas as a
            inner join usuarios as b on a.idNutri = b.idUsuario
            where b.bloqueado = false`);

        if (rows.length <= 0)
            return;

        return rows;

    } finally {
        await conexao.end();
    }
}

async function verificarSeNutriJaTemCadastro(email) {
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

async function criarNutricionista(novoNutricionista) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const parametrosDoUsuario = [
            novoNutricionista.usuario.idUsuario,
            novoNutricionista.usuario.perfil,
            novoNutricionista.usuario.nome,
            novoNutricionista.usuario.login,
            novoNutricionista.usuario.senha,
            novoNutricionista.usuario.bloqueado
        ]

        const parametrosDoNutricionista = [
            novoNutricionista.idNutri,
            novoNutricionista.nome,
            novoNutricionista.email,
            novoNutricionista.telefone,
            novoNutricionista.registroProfissional
        ]

        await conexao.beginTransaction();

        await conexao.execute(
            `insert into usuarios (idUsuario, perfil, nome, login, senha, bloqueado) 
            values (?, ?, ?, ?, ?, ?);`, parametrosDoUsuario);
        await conexao.execute(
            `insert into nutricionistas (idNutri, nome, email, telefone, registroProfissional) 
            values (?, ?, ?, ?, ?);`, parametrosDoNutricionista);

        await conexao.commit();

    } finally {
        await conexao.end();
    }
}

async function buscarNutricionistasPorFiltro(nome) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select a.idNutri, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.bloqueado 
                from nutricionistas as a
                inner join usuarios as b on a.idNutri = b.idUsuario`);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select a.idNutri, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                b.bloqueado 
                from nutricionistas as a
                inner join usuarios as b on a.idNutri = b.idUsuario
                where a.nome = ?`, [nome.toLowerCase()]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }

}

async function buscarNutriPorId(idNutri) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select a.idNutri, a.nome, a.email, a.telefone, a.registroProfissional, a.sobreMim,
                    b.imagem, b.bloqueado 
            from nutricionistas as a
            inner join usuarios as b on a.idNutri = b.idUsuario
            where a.idNutri = ?`, [idNutri]);

        if (rows.length <= 0)
            return;

        return rows[0];

    } finally {
        await conexao.end();
    }
}

async function salvarAlteracaoDeDados(idNutri, nome, email, telefone, registroProfissional, bloqueado) {
    const conexao = await baseDeDados.abrirConexao();

    try {

        await conexao.beginTransaction();

        await conexao.execute(
            `update usuarios
            set nome = ?, login = ?, bloqueado = ?
            where idUsuario = ?`, [nome, email, bloqueado, idNutri]);

        await conexao.execute(
            `update nutricionistas
            set nome = ?, email = ?, telefone = ?, registroProfissional = ?
            where idNutri = ?`, [nome, email, telefone, registroProfissional, idNutri]);

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
            `update nutricionistas
            set nome = ?, telefone = ?
            where idNutri = ?`, [nome, telefone, idUsuario]);

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
            `update nutricionistas
            set sobreMim = ?
            where idNutri = ?`, [texto, idUsuario]);

    }
    finally {
        await conexao.end();
    }
}

async function buscarPacientesPorFiltro(idUsuario, nome) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        if (!nome) {
            const [rows, fields] = await conexao.execute(
                `select	a.idAssinante, a.nome, 
                        b.objetivo	
                from assinantes as a
                    left join dietas as b on b.idNutri = a.idNutri 
                        and b.data = (select max(b.data) data 
                        from  dietas b where b.idNutri = ? and b.idAssinante = a.IdAssinante)
                where a.idNutri = ?`, [idUsuario, idUsuario]);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select	a.idAssinante, a.nome, 
                    b.objetivo	
            from assinantes as a
                left join dietas as b on b.idNutri = a.idNutri 
                    and b.data = (select max(b.data) data 
                    from  dietas b where b.idNutri = ? and b.idAssinante = a.IdAssinante)
            where a.idNutri = ? and a.nome like ?`, [idUsuario, idUsuario `%${nome}%`]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }
}

async function buscarPacientePorId(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select a.imagem,
                    b.nome, b.idSexo, b.dataNascimento, b.altura, b.idNutri 
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

        const [dietas, fieldsDietas] = await conexao.execute(
            `select idDieta, dataInicio, dataFim, objetivo
                from dietas
                where idAssinante = ?
                order by data desc`, [idAssinante]);

        return {
            dados: rows[0],
            medidasAtuais: medidasAtuais[0],
            dietas: dietas
        }

    } finally {
        await conexao.end();
    }
}



module.exports = {
    buscarNutricionistasAtivos: buscarNutricionistasAtivos,
    verificarSeNutriJaTemCadastro: verificarSeNutriJaTemCadastro,
    criarNutricionista: criarNutricionista,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    buscarNutriPorId: buscarNutriPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarAlteracaoDeDadosDoPerfil: salvarAlteracaoDeDadosDoPerfil,
    salvarAlteracaoSobreMim: salvarAlteracaoSobreMim,
    buscarPacientesPorFiltro: buscarPacientesPorFiltro,
    buscarPacientePorId: buscarPacientePorId,
};