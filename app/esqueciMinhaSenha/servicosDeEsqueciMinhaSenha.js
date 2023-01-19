import * as util from "../util/tratamentoDeRespostaApi.js";

export async function fazerLogin(email, senha) {
    const url = `http://localhost:3000/login`;

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }),
        headers: {
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    return util.tratarRespostaApi(resposta);
}