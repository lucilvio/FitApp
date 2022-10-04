const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');
//buscar ao carregar a pagina do site

function buscarPlanos(req, res) {
    let planos = repositorioDePlanos.buscarPlanosAtivos();

    res.send(planos.map(function (plano) {
        return {
            idPlano: plano.idPlano,
            nome: plano.nome,
            valor: plano.valor,
            descricao: plano.descricao
        }
    }));
}

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

module.exports = {
    buscarPlanos: buscarPlanos,
    buscarNutricionistas: buscarNutricionistas,
    buscarPersonalTrainers: buscarPersonalTrainers,
    buscarNutriPorId: buscarNutriPorId,
}