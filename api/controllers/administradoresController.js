const Nutricionista = require('../model/nutricionista');
const PersonalTrainer = require('../model/personalTrainer');
const Plano = require('../model/plano');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const repositorioDeAssinaturas = require('../repositorios/repositorioDeAssinaturas');

// O administrador cadastra plano
async function cadastrarPlano(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para cadastrar um Plano.'

    const planoEncontrado = await repositorioDePlanos.verificarSeJaExistePlanoCadastradoPeloNome(req.body.nome);

    if (!planoEncontrado) {
        const novoPlano = new Plano.Plano(req.body.nome, req.body.valor, req.body.duracao, req.body.descricao);

        await repositorioDePlanos.criarPlano(novoPlano);

        res.send({
            idPlano: novoPlano.idPlano
        });
    } else {
        res.status(400).send({ erro: "Esse plano já foi cadastrado" });
        return;
    }
}

// O administrador busca todos os planos ou filtra por nome
async function buscarPlanos(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar planos - todos ou por nome.'

    let planos = await repositorioDePlanos.buscarPlanosPorFiltro(req.query.nome);

    res.send(planos.map(function (plano) {
        return {
            idPlano: plano.idPlano,
            nome: plano.nome,
            valor: plano.valor,
            duracao: plano.duracao,
            bloqueado: plano.bloqueado,
            descricao: plano.descricao
        }

    }))
}

// O administrador busca plano por Id
async function buscarPlanoPorId(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar plano por Id.'

    let planoEncontrado = await repositorioDePlanos.buscarPlanoPorId(req.params.idPlano);

    if (!planoEncontrado) {
        res.status(404).send({ erro: "Plano não encontrado" });
        return;
    }

    res.send({
        idPlano: planoEncontrado.idPlano,
        nome: planoEncontrado.nome,
        valor: planoEncontrado.valor,
        duracao: planoEncontrado.duracao,
        descricao: planoEncontrado.descricao,
        bloqueado: planoEncontrado.bloqueado,
    })
}

async function alterarDadosDoPlano(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para alterar dados do plano.'

    Plano.validarAlteracaoDoPlano(req.body.nome, req.body.valor, req.body.duracao, req.body.descricao, req.body.bloqueado);

    const planoEncontrado = await repositorioDePlanos.verificarSeJaExistePlanoCadastradoPeloNome(req.body.nome);

    if (planoEncontrado) {
        res.status(400).send({ erro: "Já existe Plano com esse nome" });
        return;
    }

    await repositorioDePlanos.salvarAlteracaoDeDados(req.params.idPlano, req.body.nome, req.body.valor, req.body.duracao, req.body.descricao, req.body.bloqueado);

    res.send();

}

function cadastrarNutricionista(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para cadastrar Nutricionista.'

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutricionistaPorEmail(req.body.email);

    if (!nutriEncontrado) {
        const novoNutricionista = new Nutricionista(req.body.nome, req.body.email, req.body.telefone, req.body.registroProfissional);

        repositorioDeNutricionistas.criarNutricionista(novoNutricionista);

        servicoDeEmail.enviar(novoNutricionista.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoNutricionista.nome, novoNutricionista.usuario.senha));

        res.send({
            idNutri: novoNutricionista.idNutri
        });
    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }
}

function buscarNutricionistas(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar Nutricionistas cadastrados - todos ou por nome.'

    let nutricionistas = repositorioDeNutricionistas.buscarNutricionistasPorFiltro(req.query.nome);

    res.send(nutricionistas.map(function (nutri) {
        return {
            idNutri: nutri.idNutri,
            nome: nutri.nome,
            email: nutri.email,
            telefone: nutri.telefone,
            registro: nutri.registro,
            bloqueado: nutri.usuario.bloqueado
        }
    }));
}

function buscarNutriPorId(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar Nutricionistas por Id.'

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.idNutri);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    res.send({
        idNutri: nutriEncontrado.idNutri,
        nome: nutriEncontrado.nome,
        email: nutriEncontrado.email,
        telefone: nutriEncontrado.telefone,
        registro: nutriEncontrado.registroProfissional,
        bloqueado: nutriEncontrado.usuario.bloqueado,
        imagem: nutriEncontrado.usuario.imagem,
        sobreMim: nutriEncontrado.sobreMim
    });
}

function alterarDadosDoNutricionista(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para alterar dados cadastrais do Nutricionista.'

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.idNutri);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: 'Nutricionista não encontrado' });
        return;
    }

    nutriEncontrado.alterarDadosDeCadastro(req.body.nome, req.body.email, req.body.telefone, req.body.registroProfissional, req.body.bloqueado);

    repositorioDeNutricionistas.salvarAlteracaoDeDados(nutriEncontrado);
    res.send();
}


function cadastrarPersonal(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para cadastrar Personal Trainer.'

    const personalTrainer = repositorioDePersonalTrainers.buscarPersonalPorEmail(req.body.email);

    if (!personalTrainer) {
        const novoPersonal = new PersonalTrainer(req.body.nome, req.body.email, req.body.telefone, req.body.registroProfissional);

        repositorioDePersonalTrainers.criarPersonal(novoPersonal);

        servicoDeEmail.enviar(novoPersonal.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoPersonal.nome, novoPersonal.usuario.senha));

        res.send({
            idPersonal: novoPersonal.idPersonal
        });
    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }
}

function buscarPersonalTrainers(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar Personal Trainer - todos ou por nome.'

    let personalTrainers = repositorioDePersonalTrainers.buscarPersonalTrainersPorFiltro(req.query.nome);

    res.send(personalTrainers.map(function (personal) {
        return {
            idPersonal: personal.idPersonal,
            nome: personal.nome,
            email: personal.email,
            telefone: personal.telefone,
            registro: personal.registro,
            bloqueado: personal.usuario.bloqueado
        }
    }));
}

function buscarPersonalPorId(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar Personal Trainer por Id.'

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.idPersonal);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    res.send({
        idPersonal: personalEncontrado.idPersonal,
        nome: personalEncontrado.nome,
        email: personalEncontrado.email,
        telefone: personalEncontrado.telefone,
        registro: personalEncontrado.registroProfissional,
        bloqueado: personalEncontrado.usuario.bloqueado,
        imagem: personalEncontrado.usuario.imagem,
        sobreMim: personalEncontrado.sobreMim
    });
}

function alterarDadosDoPersonal(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para alterar os dados cadastrais do Personal Trainer.'

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.idPersonal);

    if (!personalEncontrado) {
        res.status(404).send({ erro: 'Personal Trainer não encontrado' });
        return;
    }

    personalEncontrado.alterarDadosDeCadastro(req.body.nome, req.body.email, req.body.telefone, req.body.registroProfissional, req.body.bloqueado);

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado);
    res.send();
}

function buscarAssinantes(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar assinantes cadastrados - todos ou por nome.'

    const assinantes = repositorioDeAssinantes.buscarAssinantePorFiltro(req.query.nome);

    res.send(assinantes.map(function (assinante) {
        return {
            idAssinante: assinante.idAssinante,
            nome: assinante.nome,
            email: assinante.email,
            bloqueado: assinante.usuario.bloqueado,
        }
    }));

}

function buscarAssinantePorId(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para buscar assinantes por Id.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.params.idAssinante);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    const assinaturaEncontrada = repositorioDeAssinaturas.buscarAssinaturaAtiva(req.params.idAssinante)

    res.send({
        idAssinante: assinanteEncontrado.idAssinante,
        nome: assinanteEncontrado.nome,
        email: assinanteEncontrado.email,
        bloqueado: assinanteEncontrado.usuario.bloqueado,
        idPlano: assinaturaEncontrada.idPlano,
        nomePlano: assinaturaEncontrada.nome,
        valo: assinaturaEncontrada.valor
    });
}

function alterarStatusDoAssinante(req, res) {
    // #swagger.tags = ['Administrador']
    // #swagger.description = 'endpoint para alterar o status do Assinante.'

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.params.idAssinante);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Assinante não encontrado" });
        return;
    }

    assinanteEncontrado.alterarStatus(req.body.bloqueado);

    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);

    res.send();
}

module.exports = {
    buscarPlanos: buscarPlanos,
    buscarPlanoPorId: buscarPlanoPorId,
    alterarDadosDoPlano: alterarDadosDoPlano,
    cadastrarPlano: cadastrarPlano,
    cadastrarNutricionista: cadastrarNutricionista,
    buscarNutricionistas: buscarNutricionistas,
    buscarNutriPorId: buscarNutriPorId,
    alterarDadosDoNutricionista: alterarDadosDoNutricionista,
    cadastrarPersonal: cadastrarPersonal,
    buscarPersonalTrainers: buscarPersonalTrainers,
    buscarPersonalPorId: buscarPersonalPorId,
    alterarDadosDoPersonal: alterarDadosDoPersonal,
    buscarAssinantes: buscarAssinantes,
    buscarAssinantePorId: buscarAssinantePorId,
    alterarStatusDoAssinante: alterarStatusDoAssinante,

}