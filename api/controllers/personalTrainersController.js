const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');
const Treino = require('../model/treino');

// O Personal Trainer altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    if (req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    personalEncontrado.alterarDadosDoPerfil(req.body.telefone, req.body.imagem);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

// O Personal Trainer altera a senha
function alterarSenha(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    if (req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    personalEncontrado.alterarSenha(req.body.senha);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

// O Personal Trainer altera informações "sobre mim"
function alterarInformacoesSobreMim(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.usuario.idUsuario);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    if (req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    personalEncontrado.alterarSobreMim(req.body.texto);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

// O Personal Trainer busca seus Alunos
function buscarAlunos(req, res) {
    const alunos = repositorioDePersonalTrainers.buscarAlunosPorFiltro(req.query.nome, req.usuario.email);

    res.send(alunos.map(function (aluno) {
        return {
            idAssinante: aluno.idAssinante,
            nome: aluno.nome,
            objetivo: '',
            treino: '',
            periodo: ''
        }
    }));
}

//O Personal Trainer ver dados do Aluno
function buscarAlunoPorId(req, res) {
    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);

    if (!alunoEncontrado) {
        res.status(404).send({ erro: "Aluno não encontrado" });
        return;
    }

    res.send({
        nome: alunoEncontrado.nome,
        objetivo: alunoEncontrado.objetivo,
        dataNascimento: alunoEncontrado.dataNascimento,
        sexo: alunoEncontrado.sexo,
        altura: alunoEncontrado.altura,
        medidas: alunoEncontrado.medidas,
        treinos: alunoEncontrado.treinos

    });

}

// O Personal Trainer cria dieta
function criarTreino(req, res) {
    const alunoEncontrado = repositorioDePersonalTrainers.buscarAlunoPorId(req.params.idAssinante);

    if (!alunoEncontrado) {
        res.status(404).send({ erro: 'Aluno não encontrado' });
        return;
    }

    if (req.usuario.idUsuario == alunoEncontrado.personalTrainer) {

        const treino = new Treino(req.params.idAssinante, req.usuario.idUsuario, req.body.nomeTreino, req.body.dataInicio, req.body.dataFim, req.body.objetivo, req.body.exercicios);

        repositorioDePersonalTrainers.salvarTreino(treino);

        res.send({ idTreino: treino.idTreino });

    } else {
        res.status(400).send({ erro: "Não é possivel criar treino " })
    }
}

function buscarTreinoPorId(req, res) {

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

    res.send(treinoEncontrado);

}


function alterarTreino(req, res) {
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

    treinoEncontrado.alterarDadosDoTreino(req.params.idTreino, req.body.nomeTreino, req.body.dataInicio, req.body.dataFim, req.body.objetivo, req.body.exercicios);

    repositorioDePersonalTrainers.salvarAlteracoesDoTreino(treinoEncontrado);

    res.send();
}

module.exports = {
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    alterarInformacoesSobreMim: alterarInformacoesSobreMim,
    buscarAlunos: buscarAlunos,
    buscarAlunoPorId: buscarAlunoPorId,
    criarTreino: criarTreino,
    buscarTreinoPorId: buscarTreinoPorId,
    alterarTreino: alterarTreino,
}
