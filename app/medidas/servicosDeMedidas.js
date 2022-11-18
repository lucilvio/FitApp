import * as util from "../util/tratamentoDeRespostaApi.js"

export async function salvarMedidas(token, peso, pescoco, cintura, quadril) {
    const url = `http://localhost:3000/assinante/medidas`;

    const request = new Request(url, {
        method: 'POST',        
        body: JSON.stringify(
            {
                peso: peso,
                pescoco: pescoco,
                cintura: cintura,
                quadril: quadril
            }),
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);
    
    return util.tratarRespostaApi(resposta);
}