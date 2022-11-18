import * as util from "../util/tratamentoDeRespostaApi.js"

export async function criarConta(nome, email, plano, nutricionista, personalTrainer) {
    const url = `http://localhost:3000/assinantes`;

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(
            {
                nome: nome,
                email: email,
                idPlano: plano,
                idNutri: nutricionista,
                idPersonal: personalTrainer
            }),
        headers: {
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    return util.tratarRespostaApi(resposta);
}