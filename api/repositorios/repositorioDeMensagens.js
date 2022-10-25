const base = require('../dados');

function buscarMensagensRecebidas(idUsuario) {
    return base.dados.mensagens.filter(mensagem => mensagem.idUsuarioDestinatario == idUsuario && mensagem.excluida == false);
}

function buscarMensagensEnviadas(idUsuario) {
    return base.dados.mensagens.filter(mensagem => mensagem.idUsuarioRemetente == idUsuario);
}

function buscarMensagensExcluidas(idUsuario) {
    return base.dados.mensagens.filter(mensagem => mensagem.idUsuarioDestinatario == idUsuario && mensagem.excluida == true);
}

function buscarMensagemPorId(idUsuario, idMensagem) {
    return base.dados.mensagens.find(mensagem => mensagem.idMensagem == idMensagem);
}

function salvarMensagem(mensagem) {
    base.dados.mensagens.push(mensagem);
}

function excluirMensagem(idUsuario, idMensagem) {
    const mensagemEncontrada = buscarMensagemPorId(idUsuario, idMensagem);

    if(!mensagemEncontrada) {
        throw { mensagem: "Mensagem não encontrada", interna: true };
    }

    mensagemEncontrada.excluida = true;
}

module.exports = {
    buscarMensagensRecebidas: buscarMensagensRecebidas,
    buscarMensagensEnviadas: buscarMensagensEnviadas,
    buscarMensagensExcluidas: buscarMensagensExcluidas,
    buscarMensagemPorId: buscarMensagemPorId,
    salvarMensagem: salvarMensagem,
    excluirMensagem: excluirMensagem,

}