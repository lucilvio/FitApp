import * as servicos from "./servicosDoDashboard.js"
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";
import * as cabecalho from "../cabecalho/cabecalho.js";
import * as menu from "../menu/menu.js";

if(!seguranca.tokenValido()) {
    window.location.href = "/app/login/entrar.html";
}

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {    
    await cabecalho.carregarCabecalho();
    await menu.carregarMenu();
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

function mostrarMenu() {
    const menu = document.querySelector("#menu-perfil");

    if(menu.style.display == "none") {
        menu.style.display = "block";
    } else if(menu.style.display == "block") {
        menu.style.display = "none";
    }
}

function fazerLogout() {
    seguranca.removerToken();
    window.location.href = "/app/index.html";
}