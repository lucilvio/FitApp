import * as seguranca from "../seguranca/seguranca.js";

let conteudoPaginaInterna;
let aoCarregarPaginaInterna;

export async function carregar(caminhoPaginaInterna, carregarPaginaInterna) {
    const paginaMestra = await fetch("/app/paginaMestra/paginaMestra.html");
    const conteudoDaPaginaMestra = await paginaMestra.text();

    const paginaInterna = await fetch("/app/" + caminhoPaginaInterna);
    conteudoPaginaInterna = await paginaInterna.text();
    
    document.open();
    document.write(conteudoDaPaginaMestra);
    document.close();

    window.onload = aoCarregarPaginaMestra;

    aoCarregarPaginaInterna = carregarPaginaInterna;
}

async function aoCarregarPaginaMestra() {
    const body = document.querySelector("body");
    const main = document.createElement("main");
    main.innerHTML = conteudoPaginaInterna;

    body.append(main);

    document.querySelector("#cabecalho-foto-perfil").onclick = mostrarMenu;
    document.querySelector("#cabecalho-sair").onclick = fazerLogout;

    if(aoCarregarPaginaInterna) {
        await aoCarregarPaginaInterna();
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