const base = require('../dados');

function buscarAssianantePorEmail(email) {
    return base.dados.assinantes.find(assinante => assinante.email.toLowerCase() == email.toLowerCase());
}

function criarAssinante(novoAssinante) {
    base.dados.usuarios.push(novoAssinante.usuario);
    base.dados.assinantes.push(novoAssinante);
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

function buscarDietasPorFiltro (nome, idAssinante) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if(!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    if(!nome) {
        return assinanteEncontrado.dietas;
    } else {
        return assinanteEncontrado.dietas.filter(dieta => dieta.nomeNome == nome);
    }
    
}

function buscarDietaPorId (idAssinante, idDieta) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if(!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    return assinanteEncontrado.dietas.find(dieta => dieta.idDieta == idDieta);
}

function buscarTreinosPorFiltro (nome, idAssinante) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if(!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    if(!nome) {
        return assinanteEncontrado.treinos;
    } else {
        return assinanteEncontrado.treinos.filter(treino => treino.nomeTreino == nome);
    }
    
}

function buscarTreinoPorId (idAssinante, idTreino) {
    const assinanteEncontrado = buscarAssinantePorId(idAssinante);

    if(!assinanteEncontrado) {
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
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    criarAssinante: criarAssinante,
    buscarAssianantePorEmail: buscarAssianantePorEmail,
    buscarAssinantePorFiltro: buscarAssinantePorFiltro,
    buscarAssinantePorId: buscarAssinantePorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    salvarDieta: salvarDieta,
    buscarDietasPorFiltro: buscarDietasPorFiltro,
    buscarDietaPorId: buscarDietaPorId,
    buscarTreinosPorFiltro: buscarTreinosPorFiltro,
    buscarTreinoPorId: buscarTreinoPorId,
    salvarMedidas: salvarMedidas,
}