const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');

function buscarPlanos(req, res) {
    // #swagger.tags = ['Geral']
    // #swagger.description = 'endpoint para buscar planos ativos ao carregar a pagina do site.'
    // #swagger.security = [] 

    let planos = repositorioDePlanos.buscarPlanosAtivos();

    res.send(planos.map(function (plano) {
        return {
            idPlano: plano.idPlano,
            nome: plano.nome,
            valor: plano.valor,
            duracao: plano.duracao,
            descricao: plano.descricao
        }
    }));
}

function buscarNutricionistas(req, res) {
    // #swagger.tags = ['Geral']
    // #swagger.description = 'endpoint para buscar Nutricionistas ativos ao carregar a pagina do site.'
    // #swagger.security = [] 

    let nutricionistas = repositorioDeNutricionistas.buscarNutricionistasAtivos();

    res.send(nutricionistas.map(function (nutri) {
        return {
            idNutri: nutri.idNutri,
            nome: nutri.nome,
            imagem: nutri.usuario.imagem,
            sobreMim: nutri.sobreMim
        }
    }));
}

function buscarPersonalTrainers(req, res) {
    // #swagger.tags = ['Geral']
    // #swagger.description = 'endpoint para buscar buscar Personal Trainers ativos ao carregar a pagina do site.'
    // #swagger.security = [] 

    let personalTrainers = repositorioDePersonalTrainers.buscarPersonalTrainersAtivos();

    res.send(personalTrainers.map(function (personal) {
        return {
            idPersonal: personal.idPersonal,
            nome: personal.nome,
            imagem: personal.usuario.imagem,
            sobreMim: personal.sobreMim
        }
    }));
}

function buscarNutriPorId(req, res) {
    // #swagger.tags = ['Geral']
    // #swagger.description = 'endpoint para buscar Nutricionista por Id na pagina do site.'
    // #swagger.security = [] 

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.idNutri);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    res.send({
        idNutri: nutriEncontrado.idNutri,
        nome: nutriEncontrado.nome,
        //comentado devido a migracao para bd - verificar
        //imagem: nutriEncontrado.usuario.imagem,
        sobreMim: nutriEncontrado.sobreMim
    });
}

function buscarPersonalPorId(req, res) {
    // #swagger.tags = ['Geral']
    // #swagger.description = 'endpoint para buscar Personal trainer por Id na pagina do site.'
    // #swagger.security = [] 

    const PersonalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.idPersonal);

    if (!PersonalEncontrado) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    res.send({
        idPersonal: PersonalEncontrado.idPersonal,
        nome: PersonalEncontrado.nome,
       // imagem: PersonalEncontrado.usuario.imagem,
        sobreMim: PersonalEncontrado.sobreMim
    });
}

function buscarPlanoPorId(req, res) {
    // #swagger.tags = ['Geral']
    // #swagger.description = 'endpoint para buscar Plano por Id na pagina do site.'
    // #swagger.security = [] 

    const PlanoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.params.idPlano);

    if (!PlanoEncontrado) {
        res.status(404).send({ erro: "Plano não encontrado" });
        return;
    }

    res.send({
        idPlano: PlanoEncontrado.idPlano,
        nome: PlanoEncontrado.nome,
        valor: PlanoEncontrado.valor,
        duracao: PlanoEncontrado.duracao,
        descricao: PlanoEncontrado.descricao
    });
}

module.exports = {
    buscarPlanos: buscarPlanos,
    buscarNutricionistas: buscarNutricionistas,
    buscarPersonalTrainers: buscarPersonalTrainers,
    buscarNutriPorId: buscarNutriPorId,
    buscarPersonalPorId: buscarPersonalPorId,
    buscarPlanoPorId: buscarPlanoPorId
}