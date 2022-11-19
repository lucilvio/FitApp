import * as seguranca from "../seguranca/seguranca.js";

export async function carregarCabecalho() {
    //pega o elemento body
    const body = document.querySelector("body");
    
    //traz o conteudo do html do cabeçalho e converte a resposta para texto
    const cabecalho = await fetch("/app/cabecalho/cabecalho.html");
    const conteudoDoCabecalho = await cabecalho.text();
    
    //cria o elemento header e adiciona o conteudo do cabeçalho
    const header = document.createElement("header");
    header.innerHTML = conteudoDoCabecalho;

    //adiciona o header no body
    body.prepend(header);

    document.querySelector("#cabecalho-foto-perfil").onclick = mostrarMenu;
    document.querySelector("#cabecalho-sair").onclick = fazerLogout;
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