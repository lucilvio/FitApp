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
const Idade = require('../model/idade');
const Imc = require('../model/imc');


async function cadastrarAssinante(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para cadastrar Assinante.'

    const planoEncontrado = await repositorioDePlanos.buscarPlanoPorId(req.body.idPlano);
    if (!planoEncontrado) {
        res.status(400).send({ erro: "Plano não encontrado" });
        return;
    }

    const nutriEncontrado = await repositorioDeNutricionistas.buscarNutriPorId(req.body.idNutri);
    if (!nutriEncontrado) {
        res.status(400).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    const personalEncontrado = await repositorioDePersonal.buscarPersonalPorId(req.body.idPersonal);
    if (!personalEncontrado) {
        res.status(400).send({ erro: "Personal não encontrado" });
        return;
    }

    const assinanteEncontrado = await repositorioDeAssinantes.verificarSeAssinanteJaTemCadastro(req.body.email);
    if (!assinanteEncontrado) {
        const novoAssinante = new Assinante(req.body.nome, req.body.email, planoEncontrado, req.body.idNutri, req.body.idPersonal);

        await repositorioDeAssinantes.criarAssinante(novoAssinante);

        servicoDeEmail.enviar(novoAssinante.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoAssinante.nome, novoAssinante.usuario.senha));

        const admin = await repositorioDeUsuarios.buscarAdmin();
        repositorioDeMensagens.salvarMensagem(new Mensagem(admin.idUsuario, admin.login, nutriEncontrado.idNutri, nutriEncontrado.email, 'Novo Assinante', servicoDeMensagens.gerarNotificacaoNovoAssinante(nutriEncontrado.nome, novoAssinante.nome)));
        repositorioDeMensagens.salvarMensagem(new Mensagem(admin.idUsuario, admin.login, personalEncontrado.idPersonal, personalEncontrado.email, 'Novo Assinante', servicoDeMensagens.gerarNotificacaoNovoAssinante(personalEncontrado.nome, novoAssinante.nome)));
        res.send({
            idAssinante: novoAssinante.idAssinante
        });
    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

async function buscarDadosDoDashboard(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar dados do daskboard do assinante.'

    const dadosDoAssinante = await repositorioDeAssinantes.buscarDadosDoDashboardDoAssinantePorId(req.usuario.idUsuario);

    res.send({
        idAssinante: dadosDoAssinante.dados.idAssinante,
        imagem: dadosDoAssinante.dados.imagem,
        nome: dadosDoAssinante.dados.nome,
        altura: dadosDoAssinante.dados.altura,
        idade: new Idade(dadosDoAssinante.dataNascimento).valor,
        peso: dadosDoAssinante.pesoAtual,
        imc: new Imc(dadosDoAssinante.pesoAtual, dadosDoAssinante.dados.altura).valor,
        medidas: dadosDoAssinante.historicoDePeso
        // idDieta: !dietaAtual ? 0 : dietaAtual.idDieta,
        // idTreino: !treinoAtual ? 0 : treinoAtual.idTreino,
    })
}

async function buscarDadosDoPerfil(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar dados do perfil do assinante.'

    const dadosDoAssinante = await repositorioDeAssinantes.buscarDadosDoPerfilDoAssinantePorId(req.usuario.idUsuario);

    res.send({
        idAssinante: dadosDoAssinante.idAssinante,
        imagem: dadosDoAssinante.imagem,
        email: dadosDoAssinante.login,
        nome: dadosDoAssinante.nome,
        dataNascimento: dadosDoAssinante.dataNascimento,
        sexo: dadosDoAssinante.sexo,
        altura: dadosDoAssinante.altura,
        idNutri: dadosDoAssinante.nutricionista,
        idPersonal: dadosDoAssinante.personalTrainer,
        idAssinatura: dadosDoAssinante.idAssinatura,
        idPlano: dadosDoAssinante.idPlano
    })

}

async function alterarDadosDoPerfil(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para alterar os dados do perfil.'

    Assinante.validarAlteracaoDoPerfil(req.body.nome);
    await repositorioDeAssinantes.salvarAlteracaoDeDadosDoPerfil(req.usuario.idUsuario, req.body.nome, req.body.imagem, req.body.dataNascimento, req.body.idSexo, req.body.altura);
    
    res.send();
}

function buscarDadosDaAssinatura(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar dados da Assinatura.'

    const dadosDaAssinatura = repositorioDeAssinaturas.buscarAssinaturaPorId(req.usuario.idUsuario, req.params.idAssinatura);

    if (!dadosDaAssinatura) {
        res.status(404).send({ erro: "Assinatura não encontrada" });
        return;
    }

    if (dadosDaAssinatura.bloqueado == true) {
        res.status(400).send({ erro: "Assinatura cancelada" });
        return;
    }

    if (req.usuario.idUsuario != dadosDaAssinatura.idAssinante) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(dadosDaAssinatura.idPlano);
    if (!planoEncontrado) {
        res.status(404).send({ erro: "Plano não encontrado" });
        return;
    }

    res.send({
        dataInicio: dadosDaAssinatura.dataInicio,
        dataFim: dadosDaAssinatura.dataFim,
        idPlano: dadosDaAssinatura.idPlano,
        nome: planoEncontrado.nome,
        valor: planoEncontrado.valor,
        descricao: planoEncontrado.descricao,
        
    });
}

function cancelarAssinatura(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para cancelar Assinatura.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    assinanteEncontrado.cancelarAssinatura(req.params.idAssinatura);
    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}

function alterarPlanoDaAssinatura(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para alterar o Plano da Assinatura.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.body.idPlano);

    assinanteEncontrado.alterarPlanoDaAssinatura(req.params.idAssinatura, planoEncontrado);
    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}


function buscarDadosDoNutri(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar informações do Nutricionista.'

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

function buscarDadosDoPersonal(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar informações do Personal Trainer.'

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

function buscarDietas(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar dietas.'

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


function buscarDietaPorId(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar dieta por Id.'

    const dietaEncontrada = repositorioDeAssinantes.buscarDietaPorId(req.usuario.idUsuario, req.params.idDieta);

    if (!dietaEncontrada) {
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

function buscarTreinos(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar Treinos.'

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

function buscarTreinoPorId(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar treino por Id.'

    const treinoEncontrado = repositorioDeAssinantes.buscarTreinoPorId(req.usuario.idUsuario, req.params.idTreino);

    if (!treinoEncontrado) {
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

function inserirMedidas(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para inserir medidas.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);
    assinanteEncontrado.inserirMedidas(new Medidas(req.body.peso, req.body.pescoco, req.body.cintura, req.body.quadril));
    repositorioDeAssinantes.salvarMedidas(assinanteEncontrado);

    res.send({ idMedida: assinanteEncontrado.medidasAtuais().idMedida });
}

function buscarMedidas(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para buscar medidas.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    const medidasOrdenadasPorData = assinanteEncontrado.medidas.sort(function (a, b) {
        if (a.data.getTime() < b.data.getTime()) {
            return 1;
        }
        if (a.data.getTime() > b.data.getTime()) {
            return -1;
        }

        return 0;
    });

    res.send({
        historicoMedidas: medidasOrdenadasPorData,
        medidasAtuais: assinanteEncontrado.medidasAtuais()
    });
}

function excluirMedidas(req, res) {
    // #swagger.tags = ['Assinante']
    // #swagger.description = 'endpoint para excluir medidas.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);
    assinanteEncontrado.excluirMedidas(req.params.idMedida);
    repositorioDeAssinantes.salvarMedidas(assinanteEncontrado);
    res.send();
}


module.exports = {
    buscarDadosDoDashboard: buscarDadosDoDashboard,
    cadastrarAssinante: cadastrarAssinante,
    buscarDadosDoPerfil: buscarDadosDoPerfil,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    buscarDadosDaAssinatura: buscarDadosDaAssinatura,
    cancelarAssinatura: cancelarAssinatura,
    alterarPlanoDaAssinatura: alterarPlanoDaAssinatura,
    buscarDadosDoNutri: buscarDadosDoNutri,
    buscarDadosDoPersonal: buscarDadosDoPersonal,
    buscarDietas: buscarDietas,
    buscarDietaPorId: buscarDietaPorId,
    buscarTreinos: buscarTreinos,
    buscarTreinoPorId: buscarTreinoPorId,
    inserirMedidas: inserirMedidas,
    buscarMedidas: buscarMedidas,
    excluirMedidas: excluirMedidas

}