const base = require('../dados');
const baseDeDados = require('../conexao');
const Assinante = require('../model/assinante');

async function verificarSeAssinanteJaTemCadastro(email) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select email from assinantes where email = ?`, [email.toLowerCase()]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

async function criarAssinante(novoAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    const parametrosDoUsuario = [
        novoAssinante.usuario.idUsuario,
        novoAssinante.usuario.perfil,
        novoAssinante.usuario.nome.toLowerCase(),
        novoAssinante.usuario.login,
        novoAssinante.usuario.senha,
        novoAssinante.usuario.bloqueado
    ]

    const parametrosDoAssinante = [
        novoAssinante.idAssinante,
        novoAssinante.nutricionista,
        novoAssinante.personalTrainer,
        novoAssinante.nome.toLowerCase(),
        novoAssinante.email
    ]

    const assinatura = novoAssinante.buscarAssinaturaAtiva();

    const parametrosDaAssinatura = [
        assinatura.idAssinatura,
        assinatura.idAssinante,
        assinatura.idPlano,
        assinatura.dataInicio,
        assinatura.dataFim,
        assinatura.bloqueado
    ]

    await conexao.beginTransaction();

    await conexao.execute(
        `insert into usuarios (idUsuario, perfil, nome, login, senha, bloqueado) 
         values (?, ?, ?, ?, ?, ?);`, parametrosDoUsuario);
    await conexao.execute(
        `insert into assinantes (idAssinante, idNutri, idPersonal, nome, email) 
         values (?, ?, ?, ?, ?);`, parametrosDoAssinante);
    await conexao.execute(
        `insert into assinaturas (idAssinatura, idAssinante, idPlano, dataInicio, dataFim, bloqueado) 
         values (?, ?, ?, ?, ?, ?);`, parametrosDaAssinatura);

    await conexao.commit();

    await conexao.end();
}

async function buscarDadosDoDashboardDoAssinantePorId(idUsuario) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select a.imagem,
                b.idAssinante, b.nome, b.altura, b.dataNascimento
        from usuarios as a
        inner join assinantes as b on a.idUsuario = b.idAssinante
        where a.idUsuario = ?`, [idUsuario]);

    const [pesos, fieldsPesos] = await conexao.execute(
        `select peso, data
            from medidas
            where idAssinante = ?`, [idUsuario]);


    await conexao.end();

    let pesoAtual = 0;

    if (rows.length <= 0)
        return;

    if (pesos.length > 0) {
        const dataDoUltimoPeso = Math.max(...pesos.map(peso => new Date(peso.data)));
        pesoAtual = pesos.find(peso => peso.data.getTime() == dataDoUltimoPeso).peso;
    }


    return {
        dados: rows[0],
        historicoDePeso: pesos[0],
        pesoAtual: pesoAtual
    }
}

async function buscarDadosDoPerfilDoAssinantePorId(idUsuario) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select a.imagem, a.login,a.nome, 
		        b.idAssinante, b.altura, b.dataNascimento, b.idSexo, b.idNutri, b.idPersonal, 
                c.idAssinatura, c.idPlano
        from usuarios as a
        inner join assinantes as b on a.idUsuario = b.idAssinante
        inner join assinaturas as c on a.idUsuario = c.idAssinante
        where a.idUsuario = ?`, [idUsuario]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

async function buscarAssinantePorId(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select a.idAssinante, a.idNutri, a.idPersonal, a.nome, a.email, a.dataNascimento, a.idSexo, a.altura, a.objetivos, 
        b.idAssinatura, b.idPlano, b.dataInicio, b.dataFim, b.bloqueado 
        from assinantes as a
        inner join assinaturas as b on a.idAssinante = b.idAssinante
        where a.idAssinante = ?`, [idAssinante]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

async function salvarAlteracaoDeDadosDoPerfil(idUsuario, nome, dataNascimento, idSexo, altura) {
    const conexao = await baseDeDados.abrirConexao();

    await conexao.beginTransaction();
    await conexao.execute(
        `update usuarios
        set nome = ?
        where idUsuario = ?`, [nome.toLowerCase(), idUsuario]);

    await conexao.execute(
        `update assinantes
            set nome = ?, dataNascimento = ?, idSexo = ?, altura = ?
            where idAssinante = ?`, [nome.toLowerCase(), new Date(dataNascimento), idSexo, altura, idUsuario]);

    await conexao.commit();
    await conexao.end();
}

async function salvarMedidas(idUsuario, medidas) {

    const conexao = await baseDeDados.abrirConexao();

    const parametrosDeMedidas = [
        idUsuario,
        medidas.idMedidas,
        medidas.data,
        medidas.peso,
        medidas.pescoco,
        medidas.cintura,
        medidas.quadril
    ]

    await conexao.execute(
        `insert into medidas (idAssinante, idMedidas, data, peso, pescoco, cintura, quadril)
        values (?, ?, ?, ?, ?, ?, ?)`, parametrosDeMedidas);

    await conexao.end();
}

async function buscarMedidasDoAssinante(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select data, idMedidas, peso, pescoco, cintura, quadril 
        from medidas
        where idAssinante = ?
        order by data desc`, [idAssinante]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows;
}

async function excluirMedidasDoAssinante(idAssinante, idMedidas) {
    const conexao = await baseDeDados.abrirConexao();

    await conexao.execute(
        `delete from medidas
        where idAssinante = ? and idMedidas = ?`, [idAssinante, idMedidas]);

    await conexao.end();
}

function buscarAssinantePorFiltro(nome) {
    if (!nome) {
        return base.dados.assinantes;
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function salvarAlteracaoDeDados(assinante) {
    let assinanteEncontrado = buscarAssinantePorId(assinante.idAssinante);
    assinanteEncontrado = assinante;
}

function salvarDieta(assinante) {
    let assinanteEncontrado = buscarAssinantePorId(assinante.idAssinante);
    assinanteEncontrado = assinante;
}

function salvarTreino(assinante) {
    let assinanteEncontrado = buscarAssinantePorId(assinante.idAssinante);
    assinanteEncontrado = assinante;
}

function buscarDietasPorFiltro(nome, idAssinante) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    if (!nome) {
        return assinanteEncontrado.dietas;
    } else {
        return assinanteEncontrado.dietas.filter(dieta => dieta.nomeNome == nome);
    }

}

function buscarDietaPorId(idAssinante, idDieta) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    return assinanteEncontrado.dietas.find(dieta => dieta.idDieta == idDieta);
}

function buscarTreinosPorFiltro(nome, idAssinante) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    if (!nome) {
        return assinanteEncontrado.treinos;
    } else {
        return assinanteEncontrado.treinos.filter(treino => treino.nomeTreino == nome);
    }

}

function buscarTreinoPorId(idAssinante, idTreino) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    return assinanteEncontrado.treinos.find(treino => treino.idTreino == idTreino);
}



module.exports = {
    verificarSeAssinanteJaTemCadastro: verificarSeAssinanteJaTemCadastro,
    criarAssinante: criarAssinante,
    buscarDadosDoDashboardDoAssinantePorId: buscarDadosDoDashboardDoAssinantePorId,
    buscarDadosDoPerfilDoAssinantePorId: buscarDadosDoPerfilDoAssinantePorId,
    salvarMedidas: salvarMedidas,
    buscarMedidasDoAssinante: buscarMedidasDoAssinante,
    excluirMedidasDoAssinante: excluirMedidasDoAssinante,
    salvarAlteracaoDeDadosDoPerfil: salvarAlteracaoDeDadosDoPerfil,
    buscarAssinantePorFiltro: buscarAssinantePorFiltro,
    buscarAssinantePorId: buscarAssinantePorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarDieta: salvarDieta,
    salvarTreino: salvarTreino,
    buscarDietasPorFiltro: buscarDietasPorFiltro,
    buscarDietaPorId: buscarDietaPorId,
    buscarTreinosPorFiltro: buscarTreinosPorFiltro,
    buscarTreinoPorId: buscarTreinoPorId,
    
}