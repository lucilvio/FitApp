const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');
const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const Treino = require('../model/treino');

function buscarDadosDoPerfil(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para buscar dados do perfil.'

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    res.send({
        idPersonal: personalEncontrado.idPersonal,
        imagem: personalEncontrado.usuario.imagem,
        email: personalEncontrado.usuario.login,
        nome: personalEncontrado.nome,
        registroProfissional: personalEncontrado.registroProfissional,
        telefone: personalEncontrado.telefone,
        sobreMim: personalEncontrado.sobreMim
    })

}

function alterarDadosDoPerfil(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para alterar dados do perfil.'

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    personalEncontrado.alterarDadosDoPerfil(req.body.telefone, req.body.imagem);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

function alterarSenha(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para alterar senha de login.'

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    personalEncontrado.alterarSenha(req.body.senha);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

function alterarInformacoesSobreMim(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para alterar informações "Sobre Mim".'

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    personalEncontrado.alterarSobreMim(req.body.texto);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

function buscarAlunos(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para buscar alunos.'

    const alunos = repositorioDePersonalTrainers.buscarAlunosPorFiltro(req.query.nome, req.usuario.email);

    res.send(alunos.map(function (aluno) {
        return {
            idAssinante: aluno.idAssinante,
            nome: aluno.nome,
            objetivo: aluno.objetivo,
            treinos: aluno.treinos
        }
    }));
}

function buscarAlunoPorId(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para buscar aluno por Id.'

    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);

    if (!alunoEncontrado) {
        res.status(404).send({ erro: "Aluno não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != alunoEncontrado.personalTrainer) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    res.send({
        nome: alunoEncontrado.nome,
        objetivo: alunoEncontrado.objetivo,
        dataNascimento: alunoEncontrado.dataNascimento,
        sexo: alunoEncontrado.sexo,
        altura: alunoEncontrado.altura,
        treinos: alunoEncontrado.treinos

    });

}

function buscarMedidasDoAluno(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para buscar medidas do aluno.'

    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);

    if (!alunoEncontrado) {
        res.status(404).send({ erro: "Aluno não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != alunoEncontrado.personalTrainer) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    res.send({
        medidas: alunoEncontrado.medidas,
    });

}

function criarTreino(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para criar treino.'

    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);

    if (!alunoEncontrado) {
        res.status(404).send({ erro: 'Aluno não encontrado' });
        return;
    }

    if (req.usuario.idUsuario == alunoEncontrado.personalTrainer) {

        const treino = new Treino(req.params.idAssinante, req.usuario.idUsuario, req.body.nomeTreino, req.body.dataInicio, req.body.dataFim, req.body.objetivo, req.body.exercicios);
        alunoEncontrado.inserirTreino(treino);
        repositorioDeAssinantes.salvarTreino(treino);

        res.send({ idTreino: treino.idTreino });

    } else {
        res.status(400).send({ erro: "Não é possivel criar treino " })
    }
}

function buscarTreinoPorId(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para buscar treino por Id.'

    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);

    if (!alunoEncontrado) {
        res.status(404).send({ erro: "Aluno não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != alunoEncontrado.personalTrainer) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    const treinoEncontrado = repositorioDePersonalTrainers.buscarTreinoPorId(req.params.idAssinante, req.params.idTreino);

    if (!treinoEncontrado) {
        res.status(404).send({ erro: "Treino não encontrado" });
        return;
    }

    res.send(treinoEncontrado);

}

function alterarTreino(req, res) {
    // #swagger.tags = ['Personal Trainer']
    // #swagger.description = 'endpoint para alterar treino.'

    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);
    if (!alunoEncontrado) {
        res.status(404).send({ erro: "Aluno não encontrado" });
        return;
    }

    const treinoEncontrado = repositorioDePersonalTrainers.buscarTreinoPorId(req.params.idAssinante, req.params.idTreino);
    if (!treinoEncontrado) {
        res.status(404).send({ erro: "Treino não encontrado" });
        return;
    }

    if (req.usuario.idUsuario == alunoEncontrado.personalTrainer) {
        treinoEncontrado.alterarDadosDoTreino(req.params.idTreino, req.body.nomeTreino, req.body.dataInicio, req.body.dataFim, req.body.objetivo, req.body.exercicios);

        repositorioDePersonalTrainers.salvarAlteracoesDoTreino(treinoEncontrado);

        res.send();
    } else {
        res.status(401).send({ erro: 'Não autorizado' });
    }


}

module.exports = {
    buscarDadosDoPerfil: buscarDadosDoPerfil,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    alterarInformacoesSobreMim: alterarInformacoesSobreMim,
    buscarAlunos: buscarAlunos,
    buscarAlunoPorId: buscarAlunoPorId,
    buscarMedidasDoAluno: buscarMedidasDoAluno,
    criarTreino: criarTreino,
    buscarTreinoPorId: buscarTreinoPorId,
    alterarTreino: alterarTreino,
}
