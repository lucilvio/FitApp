const base = require('../dados');
const baseDeDados = require('../conexao');

async function buscarNutricionistasAtivos() {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select nutri.idNutri, nutri.nome, nutri.sobreMim,
                    usuario.imagem 
            from nutricionistas as nutri
                inner join usuarios as usuario on nutri.idNutri = usuario.idUsuario
            where usuario.bloqueado = false`);

        if (rows.length <= 0)
            return;

        return rows;

    } finally {
        await conexao.end();
    }
}

async function verificarSeNutriJaTemCadastro(idNutri, email) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select idUsuario, login 
            from usuarios 
            where login = ? and idUsuario != ?`, [email.toLowerCase(), idNutri]);

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
                `select nutri.idNutri, nutri.nome, nutri.email, nutri.telefone, nutri.registroProfissional, nutri.sobreMim,
                        usuario.bloqueado 
                from nutricionistas as nutri
                inner join usuarios as usuario on nutri.idNutri = usuario.idUsuario`);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select nutri.idNutri, nutri.nome, nutri.email, nutri.telefone, nutri.registroProfissional, nutri.sobreMim,
                    usuario.bloqueado 
            from nutricionistas as nutri
                inner join usuarios as usuario on nutri.idNutri = usuario.idUsuario
            where nutri.nome like ?`, [`%${nome}%`]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }

}

async function buscarNutriPorId(idNutri) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select nutri.idNutri, nutri.nome, nutri.email, nutri.telefone, nutri.registroProfissional, nutri.sobreMim,
                    usuario.imagem, usuario.bloqueado 
            from nutricionistas as nutri
            inner join usuarios as usuario on nutri.idNutri = usuario.idUsuario
            where nutri.idNutri = ?`, [idNutri]);

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
                `select	assinante.idAssinante, assinante.nome, 
                        dieta.objetivo	
                from assinantes as assinante
                    left join dietas as dieta on dieta.idNutri = assinante.idNutri 
                            and dieta.data = (select max(dieta.data) data 
                        from  dietas as dieta 
                        where dieta.idNutri = ? and dieta.idAssinante = assinante.idAssinante)
                where assinante.idNutri = ?`, [idUsuario, idUsuario]);

            return rows;
        }

        const [rowsComFiltro, fieldsComFiltro] = await conexao.execute(
            `select	assinante.idAssinante, assinante.nome, 
                    dieta.objetivo	
            from assinantes as assinante
                left join dietas as dieta on dieta.idNutri = assinante.idNutri 
                        and dieta.data = (select max(dieta.data) data 
                    from  dietas as dieta 
                    where dieta.idNutri = ? and dieta.idAssinante = assinante.IdAssinante)
            where assinante.idNutri = ? and assinante.nome like ?`, [idUsuario, idUsuario,`%${nome}%`]);

        return rowsComFiltro;

    } finally {
        await conexao.end();
    }
}

async function buscarPacientePorId(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    try {
        const [rows, fields] = await conexao.execute(
            `select usuario.imagem,
                    assinante.nome, assinante.idSexo, assinante.dataNascimento, assinante.altura, assinante.idNutri 
            from usuarios as usuario
                inner join assinantes as assinante on usuario.idUsuario = assinante.idAssinante
            where usuario.idUsuario = ?`, [idAssinante]);

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