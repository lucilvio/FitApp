import * as servicos from "./servicosDoDashboard.js"
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";
import * as paginaMestra from "../paginaMestra/paginaMestra.js";

if(!seguranca.tokenValido()) {
    window.location.href = "/app/login/entrar.html";
}

await paginaMestra.carregar("dashboard/dashboard-conteudo.html", aoCarregarPagina);

async function aoCarregarPagina() {    
    await buscarDadosDoPerfil();
}

async function buscarDadosDoPerfil() {
    try {
        const token = seguranca.pegarToken();
        const resposta = await servicos.buscarDados(token);
        const data = new Date();

        document.querySelector("#nome").innerHTML = resposta.nome;
        document.querySelector("#data").innerHTML = data;
        document.querySelector("#altura").innerHTML = resposta.altura;
        document.querySelector("#peso").innerHTML = resposta.peso;
        document.querySelector("#idade").innerHTML = resposta.idade;
        document.querySelector("#imc").innerHTML = resposta.imc;
    } catch (error) {
        erros.tratarErro(error);
    }
}