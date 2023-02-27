import * as util from "../util/tratamentoDeRespostaApi.js"

export async function buscarDados(token) {
    const url = `http://localhost:3000/admin/assinantes`;

    const resposta = await fetch(url, {
        headers: {
            authorization: "Bearer " + token
        }
    });

    return util.tratarRespostaApi(resposta);
}