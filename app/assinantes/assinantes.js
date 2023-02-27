import * as servicos from "./servicosDeAssinantes"
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";
import * as paginaMestra from "../paginaMestra/paginaMestra.js";


seguranca.deslogarSeTokenEstiverExpirado("/login/entrar.html");

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    await paginaMestra.carregar("assinantes/assinantes-conteudo.html", "Assinantes");
    await buscarAssinantes();
    
}

async function buscarAssinantes() {
    try {
        const token = seguranca.pegarToken();
        const resposta = await servicos.buscarDados(token);

        

    } catch (error) {
        erros.tratarErro(error);
    }
}

