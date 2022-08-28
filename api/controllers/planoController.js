const repositorioDePlano = require('../repositorios/repositorioDePlano.js');
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

    const planoEncontrado = repositorioDePlano.buscarPlanosPorNome(req.body.nome);

    if (planoEncontrado) {
        res.status(400).send({ erro: "Esse plano já foi cadastrado" });
        return;
    }


    let novoPlano = {
        id: crypto.randomUUID(),
        nome: req.body.nome,
        valor: req.body.valor,
        bloqueado: false,
        descricao: req.body.descricao
    }

    repositorioDePlano.salvarDadosDoPlano(novoPlano);
    res.send({ idPlano: novoPlano.id });


}

function buscarPlanos(req, res) {
    const nome = req.query.nome;
    let planos = repositorioDePlano.buscarPlanosPorFiltro(nome);

    res.send(planos.map(function (plano) {
        return {
            idPlano: plano.id,
            nome: plano.nome,
            valor: plano.valor,
            status: plano.bloqueado,
            descricao: plano.descricao
        }

    }))
}

function alterarPlano(req, res) {
    const planoEncontrado = repositorioDePlano.buscarPlanoPorId(req.params.id);

    if (!planoEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const planoNome = req.body.nome;
    const planoValor = req.body.valor;
    const planoBloqueado = req.body.bloqueado;
    const planoDescricao = req.body.descricao;

    if (planoNome != undefined && planoNome != null && planoNome != "") {
        planoEncontrado.nome = planoNome;
    }

    if(planoValor != undefined && planoValor != null && planoValor != "" && planoValor >= 0) {
        planoEncontrado.valor = planoValor;
    }

    if (typeof (planoBloqueado) == 'boolean') {
        planoEncontrado.bloqueado = planoBloqueado;
    }

    if(planoDescricao != undefined && planoDescricao != null && planoDescricao != "") {
        planoEncontrado.descricao = planoDescricao;
    } 

    res.send(planoEncontrado);

}

module.exports = {
    cadastrarPlano: cadastrarPlano,
    buscarPlanos: buscarPlanos,
    alterarPlano: alterarPlano
}