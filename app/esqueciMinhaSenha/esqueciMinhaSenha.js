import * as servicos from "./servicosDeEsqueciMinhaSenha.js";
import * as erros from "../util/tratamentoDeErros.js";
import * as paginaMestraSite from "../paginaMestraSite/paginaMestraSite.js";

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    await paginaMestraSite.carregar("esqueciMinhaSenha/esqueciMinhaSenha-conteudo.html", "Esqueci minha senha");
    document.querySelector("#btn-gerarNovaSenha").onclick = gerarNovaSenha;
}

async function gerarNovaSenha(evento) {
    const email = document.querySelector("#email").value;
    
    const formulario = document.querySelector("#formulario");

    if (formulario.checkValidity() == false) {
        return false;
    }

    evento.preventDefault();

    try {
        await servicos.gerarNovaSenha(email);
        window.location.href = "../login/entrar.html";

    } catch (error) {
        erros.tratarErro(error);
    }
}