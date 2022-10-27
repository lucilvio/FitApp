const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');

//buscar planos ativos ao carregar a pagina do site
function buscarPlanos(req, res) {
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

//buscar Nutricionistas ativos ao carregar a pagina do site
function buscarNutricionistas(req, res) {
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

//buscar Personal Trainers ativos ao carregar a pagina do site
function buscarPersonalTrainers(req, res) {
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

//buscar Nutricionista por Id na pagina do site
function buscarNutriPorId(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.params.idNutri);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    res.send({
        idNutri: nutriEncontrado.idNutri,
        nome: nutriEncontrado.nome,
        imagem: nutriEncontrado.usuario.imagem,
        sobreMim: nutriEncontrado.sobreMim
    });
}

//buscar Personal trainer por Id na pagina do site
function buscarPersonalPorId(req, res) {
    const PersonalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.idPersonal);

    if (!PersonalEncontrado) {
        res.status(404).send({ erro: "Personal Trainer não encontrado" });
        return;
    }

    res.send({
        idPersonal: PersonalEncontrado.idPersonal,
        nome: PersonalEncontrado.nome,
        imagem: PersonalEncontrado.usuario.imagem,
        sobreMim: PersonalEncontrado.sobreMim
    });
}

//buscar Plano por Id na pagina do site
function buscarPlanoPorId(req, res) {
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