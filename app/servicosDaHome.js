import * as util from "../util/tratamentoDeRespostaApi.js";
import * as configuracoes from "../configuracoes.js";

export async function buscarPlanosAtivos() {
    const url = `${configuracoes.urlDaApi}/planos`;

    const resposta = await fetch(url);

    return util.tratarRespostaApi(resposta);
}

