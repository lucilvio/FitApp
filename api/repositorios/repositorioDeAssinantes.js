const base = require('../dados');
const baseDeDados = require('../conexao');

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
        novoAssinante.usuario.nome,
        novoAssinante.usuario.login,
        novoAssinante.usuario.senha,
        novoAssinante.usuario.bloqueado
    ]

    const parametrosDoAssinante = [
        novoAssinante.idAssinante,
        novoAssinante.nutricionista,
        novoAssinante.personalTrainer,
        novoAssinante.nome,
        novoAssinante.email
    ]

    await conexao.beginTransaction();
    
    await conexao.execute(
        `insert into usuarios (id_usuario, perfil, nome, login, senha, bloqueado) 
        values (?, ?, ?, ?, ?, ?);`, parametrosDoUsuario);
    await conexao.execute(
        `insert into assinantes (id_assinante, id_nutricionista, id_personal, nome, email) 
        values (?, ?, ?, ?, ?);`, parametrosDoAssinante);

    await conexao.commit();

    await conexao.end();
}

function buscarAssinantePorFiltro(nome) {
    if (!nome) {
        return base.dados.assinantes;
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function buscarAssinantePorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
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

function salvarMedidas(assinante) {
    let assinanteEncontrado = buscarAssinantePorId(assinante.idAssinante);
    assinanteEncontrado = assinante;
}

module.exports = {
    verificarSeAssinanteJaTemCadastro: verificarSeAssinanteJaTemCadastro,
    criarAssinante: criarAssinante,
    buscarAssinantePorFiltro: buscarAssinantePorFiltro,
    buscarAssinantePorId: buscarAssinantePorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarDieta: salvarDieta,
    salvarTreino: salvarTreino,
    buscarDietasPorFiltro: buscarDietasPorFiltro,
    buscarDietaPorId: buscarDietaPorId,
    buscarTreinosPorFiltro: buscarTreinosPorFiltro,
    buscarTreinoPorId: buscarTreinoPorId,
    salvarMedidas: salvarMedidas,
}