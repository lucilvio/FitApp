const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePersonal = require('../repositorios/repositorioDePersonalTrainers');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const repositorioDeAssinaturas = require('../repositorios/repositorioDeAssinaturas');
const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');
const repositorioDeMensagens = require('../repositorios/repositorioDeMensagens');
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const Assinante = require('../model/assinante');
const Medidas = require('../model/medidas');
const Mensagem = require('../model/mensagem');


//O Assinante faz o registro 
function cadastrarAssinante(req, res) {
    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.body.idPlano);
    if (!planoEncontrado) {
        res.status(400).send({ erro: "Plano não encontrado" });
        return;
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.body.idNutri);
    if (!nutriEncontrado) {
        res.status(400).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.body.idPersonal);
    if (!personalEncontrado) {
        res.status(400).send({ erro: "Personal não encontrado" });
        return;
    }

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssianantePorEmail(req.body.email);
    if (!assinanteEncontrado) {
        const novoAssinante = new Assinante(req.body.nome, req.body.email, planoEncontrado, req.body.idNutri, req.body.idPersonal);

        repositorioDeAssinantes.criarAssinante(novoAssinante);

        servicoDeEmail.enviar(novoAssinante.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoAssinante.nome, novoAssinante.usuario.senha));

        const admin = repositorioDeUsuarios.buscarAdmin();
        repositorioDeMensagens.salvarMensagem(new Mensagem(admin.idUsuario, admin.login, nutriEncontrado.idNutri, nutriEncontrado.usuario.login, 'Novo Assinante', servicoDeMensagens.gerarNotificacaoNovoAssinante(nutriEncontrado.nome, novoAssinante.nome)));
        repositorioDeMensagens.salvarMensagem(new Mensagem(admin.idUsuario, admin.login, personalEncontrado.idPersonal, personalEncontrado.usuario.login, 'Novo Assinante', servicoDeMensagens.gerarNotificacaoNovoAssinante(personalEncontrado.nome, novoAssinante.nome)));
        res.send({
            idAssinante: novoAssinante.idAssinante
        });
    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}
// O Assinante busca os dados do perfil
function buscarDadosDoPerfil(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    const assinaturaEncontrada = repositorioDeAssinaturas.buscarAssinaturaAtiva(req.usuario.idUsuario);

    if (!assinaturaEncontrada) {
        res.status(404).send({ erro: "Assinante não tem assinatura ativa" });
        return;
    }

    res.send({
        idAssinante: assinanteEncontrado.idAssinante,
        idAssinatura: assinaturaEncontrada.idAssinatura,
        idPlano: assinaturaEncontrada.idPlano,
        idNutri: assinanteEncontrado.nutricionista,
        idPersonal: assinanteEncontrado.personalTrainer,
        imagem: assinanteEncontrado.usuario.imagem,
        email: assinanteEncontrado.usuario.login,
        nome: assinanteEncontrado.nome,
        dataNascimento: assinanteEncontrado.dataNascimento,
        sexo: assinanteEncontrado.sexo,
        altura: assinanteEncontrado.altura,
    })

}

// O Assinante altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    assinanteEncontrado.alterarDadosDoPerfil(req.body.imagem, req.body.dataNascimento, req.body.sexo, req.body.altura);

    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}

// O assinante altera a senha
function alterarSenha(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    assinanteEncontrado.alterarSenha(req.body.senha);
    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}

//O assinante buscar dados da assinatura
function buscarDadosDaAssinatura(req, res) {
    const assinaturaEncontrada = repositorioDeAssinaturas.buscarAssinaturaPorId(req.usuario.idUsuario, req.params.idAssinatura);

    if (!assinaturaEncontrada) {
        res.status(404).send({ erro: "Assinatura não encontrada" });
        return;
    }

    if (assinaturaEncontrada.bloqueado == true) {
        res.status(400).send({ erro: "Assinatura cancelada" });
        return;
    }
    
    if (req.usuario.idUsuario != assinaturaEncontrada.idAssinante) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(assinaturaEncontrada.idPlano);
    if (!planoEncontrado) {
        res.status(404).send({ erro: "Plano não encontrado" });
        return;
    }

    res.send({
        idPlano: assinaturaEncontrada.idPlano,
        nome: planoEncontrado.nome,
        valor: planoEncontrado.valor,
        descricao: planoEncontrado.descricao,
        dataInicio: assinaturaEncontrada.dataInicio,
        dataFim: assinaturaEncontrada.dataFim,
    });
}

// O Assinante cancela a Assinatura
function cancelarAssinatura(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    assinanteEncontrado.cancelarAssinatura(req.params.idAssinatura);
    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}

// O Assinante altera a assinatura
function alterarPlanoDaAssinatura (req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.body.idPlano);

    assinanteEncontrado.alterarPlanoDaAssinatura(req.params.idAssinatura, planoEncontrado);
    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}


// O Assinante busca os dados da Nutricionista
function buscarDadosDoNutri (req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.idNutri);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    res.send({
        imagem: nutriEncontrado.imagem,
        nome: nutriEncontrado.nome,
        sobreMim: nutriEncontrado.sobreMim
    })
}

// O Assinante busca os dados do Personal trainer
function buscarDadosDoPersonal (req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.idPersonal);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    res.send({
        imagem: personalEncontrado.imagem,
        nome: personalEncontrado.nome,
        sobreMim: personalEncontrado.sobreMim
    })
}
// O Assinante busca as Dietas
function buscarDietas (req, res) {
    const dietas = repositorioDeAssinantes.buscarDietasPorFiltro(req.query.nome, req.usuario.idUsuario);

    res.send(dietas.map(function (dieta) {
        return {
            idDieta: dieta.idDieta,
            nome: dieta.nomeDieta,
            objetivo: dieta.objetivo,
            dataInicio: dieta.dataInicio,
            dataFim: dieta.dataFim
        }
    }));
}

// O Assinante busca dieta por id
function buscarDietaPorId (req, res) {
    const dietaEncontrada = repositorioDeAssinantes.buscarDietaPorId(req.usuario.idUsuario, req.params.idDieta);

    if(!dietaEncontrada) {
        res.status(404).send({ erro: "Dieta não encontrada" });
        return;
    }

    res.send({
        idDieta: dietaEncontrada.idDieta,
        nome: dietaEncontrada.nomeDieta,
        objetivo: dietaEncontrada.objetivo,
        itens: dietaEncontrada.itens
    });
}
// O Assinante busca os Treinos
function buscarTreinos (req, res) {
    const treinos = repositorioDeAssinantes.buscarTreinosPorFiltro(req.query.nome, req.usuario.idUsuario);

    res.send(treinos.map(function (treino) {
        return {
            idTreino: treino.idTreino,
            nome: treino.nomeTreino,
            objetivo: treino.objetivo,
            dataInicio: treino.dataInicio,
            dataFim: treino.dataFim
        }
    }));
}

// O Assinante busca treino por Id
function buscarTreinoPorId (req, res) {
    const treinoEncontrado = repositorioDeAssinantes.buscarTreinoPorId(req.usuario.idUsuario, req.params.idTreino);

    if(!treinoEncontrado) {
        res.status(404).send({ erro: "Treino não encontrado" });
        return;
    }

    res.send({
        idTreino: treinoEncontrado.idTreino,
        nome: treinoEncontrado.nomeTreino,
        objetivo: treinoEncontrado.objetivo,
        exercicios: treinoEncontrado.exercicios
    });
}
// O Assinante salva as suas Medidas
function inserirMedidas (req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);
    assinanteEncontrado.inserirMedidas(new Medidas(req.body.peso, req.body.pescoco, req.body.cintura, req.body.quadril));
    repositorioDeAssinantes.salvarMedidas(assinanteEncontrado);
    res.send();
}
// O Assinante vê o historio de medidas
function buscarMedidas (req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    res.send(assinanteEncontrado.medidas)
}


module.exports = {
    cadastrarAssinante: cadastrarAssinante,
    buscarDadosDoPerfil: buscarDadosDoPerfil,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    buscarDadosDaAssinatura: buscarDadosDaAssinatura,
    cancelarAssinatura: cancelarAssinatura,
    alterarPlanoDaAssinatura: alterarPlanoDaAssinatura,
    buscarDadosDoNutri:  buscarDadosDoNutri,
    buscarDadosDoPersonal: buscarDadosDoPersonal,
    buscarDietas: buscarDietas,
    buscarDietaPorId: buscarDietaPorId,
    buscarTreinos: buscarTreinos,
    buscarTreinoPorId: buscarTreinoPorId,
    inserirMedidas: inserirMedidas,
    buscarMedidas: buscarMedidas

}