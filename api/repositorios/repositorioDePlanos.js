const base = require('../dados');
const baseDeDados = require('../conexao');


function buscarPlanosAtivos() {
    return base.dados.planos.filter(plano => plano.bloqueado == false);
}

function criarPlano(novoPlano) {
    base.dados.planos.push(novoPlano);
}

function buscarPlanosPorNome(nome) {
    return base.dados.planos.find(plano => plano.nome.toLowerCase() == nome.toLowerCase());
}

function buscarPlanosPorFiltro(nome) {
    if(!nome) {
        return base.dados.planos;
    } else {
        return base.dados.planos.filter(plano => plano.nome.toLowerCase() == nome.toLowerCase());
    }
}

async function buscarPlanoPorId(id) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select idPlano, nome, valor, duracao, descricao, bloqueado from planos where idPlano = ?`, [id]);

    if (rows.length <= 0)
        return;

    return rows[0];
}

function salvarAlteracaoDeDados(plano) {
    let planoEncontrado = buscarPlanoPorId(plano.idPlano);

    planoEncontrado = plano;
}

module.exports = {
    buscarPlanosAtivos: buscarPlanosAtivos,
    criarPlano: criarPlano,
    buscarPlanosPorNome: buscarPlanosPorNome,
    buscarPlanosPorFiltro: buscarPlanosPorFiltro,
    buscarPlanoPorId: buscarPlanoPorId,
    salvarAlteracaoDeDados: salvarAlteracaoDeDados
}