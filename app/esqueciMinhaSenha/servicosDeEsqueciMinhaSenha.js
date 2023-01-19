import * as util from "../util/tratamentoDeRespostaApi.js";

export async function gerarNovaSenha(email) {
    const url = `http://localhost:3000/esqueciMinhaSenha`;

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