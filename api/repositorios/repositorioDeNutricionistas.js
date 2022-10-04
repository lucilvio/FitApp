const base = require('../dados');

function buscarNutricionistasAtivos() {
    return base.dados.nutricionistas.filter(nutri => nutri.usuario.bloqueado == false);
}

function buscarNutricionistaPorEmail(email) {
    return base.dados.nutricionistas.find(nutri => nutri.email.toLowerCase() == email.toLowerCase());

}

function criarNutricionista(novoNutricionista) {
    base.dados.usuarios.push(novoNutricionista.usuario);
    base.dados.nutricionistas.push(novoNutricionista);
}

function buscarNutricionistasPorFiltro(nome) {
    if (!nome) {
        return base.dados.nutricionistas;
    } else {
        return base.dados.nutricionistas.filter(nutri => nutri.nome.toLowerCase() == nome.toLowerCase());

    }
}

function buscarNutriPorId(idNutri) {
    return base.dados.nutricionistas.find(nutri => nutri.idNutri == idNutri);
}

function salvarAlteracaoDeDados(nutricionista) {
    let nutriEncontrado = buscarNutriPorId(nutricionista.idNutri);

    nutriEncontrado = nutricionista;
}

function buscarPacientesPorFiltro(nome, emailNutri) {
    const nutricionista = buscarNutricionistaPorEmail(emailNutri);

    if(!nutricionista) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    if(!nome) {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == nutricionista.idNutri);
    } else {
        return base.dados.assinantes.filter(assinante => assinante.nutricionista == nutricionista.idNutri && assinante.nome.toLowerCase() == nome.toLowerCase());
    }
}

function buscarPacientePorId(idAssinante) {
    return base.dados.assinantes.find(assinante => assinante.idAssinante == idAssinante);
}

function salvarDieta(idAssinante, nomeDieta, dataInicio, dataFim, objetivo, itens) {

    const paciente = buscarPacientePorId(idAssinante);

    if (!paciente) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    paciente.adicionarDieta(nomeDieta, dataInicio, dataFim, objetivo, itens);

    paciente.dietas.push(novaDieta);
    return novaDieta;

}

function buscarDietaPorId(pacienteEncontrado, idDieta) {
    return pacienteEncontrado.dietas.find(dieta => dieta.idDieta == idDieta);
}

function salvarAlteracoesDaDieta(dietaEncontrada, nomeDieta, dataInicio, dataFim, objetivo, itens) {
   dietaEncontrada.nomeDieta = nomeDieta;
   dietaEncontrada.dataInicio = dataInicio;
   dietaEncontrada.dataFim = dataFim;
   dietaEncontrada.objetivo = objetivo;
   dietaEncontrada.itens = itens;

}



module.exports = {
    buscarNutricionistasAtivos: buscarNutricionistasAtivos,
    buscarNutricionistaPorEmail: buscarNutricionistaPorEmail,
    criarNutricionista: criarNutricionista,
    buscarNutricionistasPorFiltro: buscarNutricionistasPorFiltro,
    buscarNutriPorId: buscarNutriPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados,
    buscarPacientesPorFiltro:  buscarPacientesPorFiltro,
    buscarPacientePorId: buscarPacientePorId,
    salvarDieta: salvarDieta,
    buscarDietaPorId: buscarDietaPorId,
    salvarAlteracoesDaDieta: salvarAlteracoesDaDieta,

};