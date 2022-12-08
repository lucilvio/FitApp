import * as util from "../app/util/tratamentoDeRespostaApi.js";

export async function buscarPlanosAtivos() {
    const url = `http://localhost:3000/planos`;

    const resposta = await fetch(url);

    return util.tratarRespostaApi(resposta);
}

