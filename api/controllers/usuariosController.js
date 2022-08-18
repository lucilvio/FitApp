
const base = require('../dados.js');




/* function buscarUsuario(req, res) {
    const id = req.params.id;

    const conexao = bancoDeDados.abrirConexao();

    conexao.query(`select U.UsuarioId, U.Nome, U.Email, T.TarefaId, T.Descricao, T.Concluida, T.Prioridade from usuarios U left join tarefas T on U.usuarioId = T.usuarioId where  U.usuarioId = '${id}'`, function (error, results, fields) {
        if(error) {
            res.status(500).send({erro: "Houve um erro interno ao tentar executar a sua operação. Tente mais tarde."});
            console.log(error);
            return;
        }

        const usuarioEncontrado = results[0];

        if (!usuarioEncontrado) {
            res.status(404).send({ erro: "Usuário não encontrado" });
            return;
        }

        const tarefas = [];

        results.forEach(item => {
            if(!item.TarefaId) {
                return;
            }

            tarefas.push({
                tarefaId: item.TarefaId,
                descricao: item.Descricao,
                tarefaConcluida: item.Concluida,
                tarefaComPrioridade: item.Prioridade
            })
        })
    
        res.send({
            id: usuarioEncontrado.UsuarioId,
            nome: usuarioEncontrado.Nome,
            email: usuarioEncontrado.Email,
            tarefas: tarefas
        });
    })

} */

module.exports = {
    criarUsuario: criarUsuario,
    /*  buscarUsuario: buscarUsuario */
}