const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const crypto = require('crypto');

function cadastrarPlano(req, res) {
    if (!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar plano sem nome" });
        return;
    }

    if (req.body.valor == undefined || req.body.valor < 0) {
        res.status(400).send({ erro: "Não é possível cadastrar plano sem valor" });
        return;
    }

    if (!req.body.descricao) {
        res.status(400).send({ erro: "Não é possível cadastrar plano sem descrição" });
        return;
    }

    const planoEncontrado = repositorioDePlanos.buscarPlanosPorNome(req.body.nome);

    if (planoEncontrado) {
        res.status(400).send({ erro: "Esse plano já foi cadastrado" });
        return;
    }


    let novoPlano = {
        idPlano: crypto.randomUUID(),
        nome: req.body.nome,
        valor: req.body.valor,
        bloqueado: false,
        descricao: req.body.descricao
    }

    repositorioDePlanos.salvarDadosDoPlano(novoPlano);
    res.send({ idPlano: novoPlano.idPlano });


}

function buscarPlanos(req, res) {
    let planos = repositorioDePlanos.buscarPlanosPorFiltro(req.query.nome);

    res.send(planos.map(function (plano) {
        return {
            idPlano: plano.idPlano,
            nome: plano.nome,
            valor: plano.valor,
            status: plano.bloqueado,
            descricao: plano.descricao
        }

    }))
}

function buscarPlanoPorId(req, res) {
    let planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.params.id);

    if(!planoEncontrado) {
        res.status(404).send({ erro: "Não encontrado"});
        return;
    }

    res.send({
        idPlano: planoEncontrado.id,
        nome: planoEncontrado.nome
    })
}

function alterarDadosDoPlano(req, res) {
    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.params.id);

    if (!planoEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const novoNome = req.body.nome;
    const novoValor = req.body.valor;
    const novoStatus = req.body.bloqueado;
    const novaDescricao = req.body.descricao;

    if (novoNome != undefined && novoNome != null && novoNome != "") {
        planoEncontrado.nome = novoNome;
    }

    if(novoValor != undefined && novoValor != null && novoValor != "" && novoValor >= 0) {
        planoEncontrado.valor = novoValor;
    }

    if (typeof (novoStatus) == 'boolean') {
        planoEncontrado.bloqueado = novoStatus;
    }

    if(novaDescricao != undefined && novaDescricao != null && novaDescricao != "") {
        planoEncontrado.descricao = novaDescricao;
    } 

    res.send(planoEncontrado);

}

module.exports = {
    cadastrarPlano: cadastrarPlano,
    buscarPlanos: buscarPlanos,
    buscarPlanoPorId: buscarPlanoPorId,
    alterarDadosDoPlano: alterarDadosDoPlano
}