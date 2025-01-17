import * as util from "../util/tratamentoDeRespostaApi.js"

export async function buscarDados(token, nome) {
    const url = `http://localhost:3000/admin/assinantes?nome=${nome}`;

    const resposta = await fetch(url, {
        headers: {
            authorization: "Bearer " + token
        }
    });

    return util.tratarRespostaApi(resposta);
}

