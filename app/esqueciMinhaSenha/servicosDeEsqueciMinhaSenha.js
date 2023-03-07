import * as util from "../util/tratamentoDeRespostaApi.js";
import * as configuracoes from "../configuracoes.js";

export async function gerarNovaSenha(email) {
    const url = `${configuracoes.urlDaApi}/esqueciMinhaSenha`;

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(
            {
                email: email
            }),
        headers: {
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    return util.tratarRespostaApi(resposta);
}