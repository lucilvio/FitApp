import * as mensagens from "./mensagens.js";

export function tratarErro(error) {
    if (!error.erro) {
        console.error(error);
    }
    else {
        mensagens.mostrarMensagemDeErro(error.erro);
        console.error(error.erro);
    }
} 