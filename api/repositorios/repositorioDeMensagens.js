const base = require('../dados');

function salvarMensagem(novaMensagem) {
    base.dados.mensagens.push(novaMensagem);
}

function buscarMensagensPorDestinatario(destinatario, excluida) {
    if(!excluida) {
        excluida = "false";
    }

    return base.dados.mensagens.filter(mensagem => mensagem.destinatario == destinatario && mensagem.excluida.toString().toLowerCase() === excluida.toLowerCase());
}

function buscarMensagensPorRemetente(remetente, excluida) {
    if(!excluida) {
        excluida = "false";
    }

    return base.dados.mensagens.filter(mensagem => mensagem.remetente == remetente && mensagem.excluida.toString().toLowerCase() === excluida.toLowerCase());
}

function buscarMensagemPorId(idMensagem) {
    return base.dados.mensagens.find(mensagem => mensagem.id == idMensagem);
}

module.exports = {
    buscarMensagensPorDestinatario: buscarMensagensPorDestinatario,
    buscarMensagensPorRemetente: buscarMensagensPorRemetente,
    buscarMensagemPorId: buscarMensagemPorId,
    salvarMensagem: salvarMensagem,
}