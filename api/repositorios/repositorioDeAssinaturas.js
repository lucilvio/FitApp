const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const baseDeDados = require('../conexao');


async function buscarAssinaturaAtiva(idAssinante) {
    const conexao = await baseDeDados.abrirConexao();

    const [rows, fields] = await conexao.execute(
        `select idAssinatura 
        from assinaturas 
        where idAssinante = ? and bloqueado = 0`, [idAssinante]);

    await conexao.end();

    if (rows.length <= 0)
        return;

    return rows[0];
}

function buscarAssinaturaPorId(idAssinante, idAssinatura) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(idAssinante);
    return assinanteEncontrado.assinaturas.find(assinatura => assinatura.idAssinatura == idAssinatura)
}

module.exports = {
    buscarAssinaturaAtiva: buscarAssinaturaAtiva,
    buscarAssinaturaPorId: buscarAssinaturaPorId,
    
}