const base = require('../dados');
const baseDeDados = require('../conexao');

function buscarNutricionistasAtivos() {
    return base.dados.nutricionistas.filter(nutri => nutri.usuario.bloqueado == false);
}

async function verificarSeNutriJaTemCadastro(email) {
    
    try {
        const conexao = await baseDeDados.abrirConexao();
        
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

    try {
        const conexao = await baseDeDados.abrirConexao();
        
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
    
    try {
        const conexao = await baseDeDados.abrirConexao();
        
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
    
    try {
        const conexao = await baseDeDados.abrirConexao();
        
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
    
    try {
        const conexao = await baseDeDados.abrirConexao();

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

function buscarPacientesPorFiltro(nome, emailNutri) {
    const nutricionista = buscarNutricionistaPorEmail(emailNutri);

    if (!nutricionista) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    if (!nome) {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == nutricionista.idNutri);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == nutricionista.idNutri && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function buscarPacientePorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
}

function buscarDietaPorId(idAssinante, idDieta) {
    const pacienteEncontrado = buscarPacientePorId(idAssinante);
    return pacienteEncontrado.dietas.find(dieta => dieta.idDieta == idDieta);
}

function salvarAlteracoesDaDieta(dieta) {
    let dietaEncontrada = buscarDietaPorId(dieta.idAssinante, dieta.idDieta);

    dietaEncontrada = dieta;

}

module.exports = {
    buscarNutricionistasAtivos: buscarNutricionistasAtivos,
    verificarSeNutriJaTemCadastro: verificarSeNutriJaTemCadastro,
    criarNutricionista: criarNutricionista,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    buscarNutriPorId: buscarNutriPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    buscarPacientesPorFiltro: buscarPacientesPorFiltro,
    buscarPacientePorId: buscarPacientePorId,
    buscarDietaPorId: buscarDietaPorId,
    salvarAlteracoesDaDieta: salvarAlteracoesDaDieta,

};