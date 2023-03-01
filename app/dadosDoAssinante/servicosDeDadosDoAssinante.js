import * as util from "../util/tratamentoDeRespostaApi.js"

export async function buscarDados(token, idAssinante) {
    const url = `http://localhost:3000/admin/assinantes/${idAssinante}`;

    const resposta = await fetch(url, {
        headers: {
            authorization: "Bearer " + token
        }
    });

    return util.tratarRespostaApi(resposta);
}

export async function alterarStatusDoAssinante(token, idAssinante, novoStatus) {
    const url = `http://localhost:3000/admin/assinantes/${idAssinante}`;

    const request = new Request(url, {
        method: 'PATCH',        
        body: JSON.stringify(
            {
                bloqueado: novoStatus

            }),
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);
    
    return util.tratarRespostaApi(resposta);
}

