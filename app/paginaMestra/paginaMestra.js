import * as seguranca from "../seguranca/seguranca.js";

export async function carregar(caminhoPaginaInterna, titulo) {
    //faz fetch da pagina mestra, tranforma a resposta em texto e guarda na const 
    const paginaMestra = await fetch("/paginaMestra/paginaMestra.html");
    const conteudoDaPaginaMestra = await paginaMestra.text();

    //faz fetch da pagina interna(pagina informada no parametro) tranforma a resposta em texto e guarda na const
    const paginaInterna = await fetch("/" + caminhoPaginaInterna);
    const conteudoPaginaInterna = await paginaInterna.text();

    //tranforma o texto da pagina mestra em Html
    const parser = new DOMParser();
    const paginaMestraHtml = parser.parseFromString(conteudoDaPaginaMestra, "text/html");

    //encontra o titulo da pagina mestra e concatena o titulo que veio como parametro na funcao
    paginaMestraHtml.querySelector("title").innerHTML = "FitApp - " + titulo;

    // adiciona o nome do usuario no cabeçalho
    paginaMestraHtml.querySelector("#cabecalho-nome").innerHTML = seguranca.pegarNomeDoUsuario();

    if(seguranca.pegarImagemDoUsuario()) {
        paginaMestraHtml.querySelector("#cabecalho-foto-perfil").src = "http://localhost:3000/" + seguranca.pegarImagemDoUsuario();
    }

    //coloca o conteudo da pagina interna dentro da tag <main> da pagina mestra
    paginaMestraHtml.querySelector("#container-conteudo").innerHTML = conteudoPaginaInterna;

    //adiciona o elemento lang no HTML da pagina criada
    document.documentElement.setAttribute("lang", "pt-BR");

    //substitui o conteudo html da pagina criada pelo conteudo da pagina mestra
    document.documentElement.innerHTML = paginaMestraHtml.documentElement.innerHTML;

    //funcao para forcar o carregamento dos scripts da pagina mestra
    carregarScripts();

    document.querySelector("#cabecalho-sair").onclick = fazerLogout;
}

function carregarScripts() {
    const scripts = document.querySelectorAll("script");

    scripts.forEach(script => {
        if (!script.src) {
            return;
        }
        //cria um novo elemento <script> com mesmo src do script encontrado
        const scriptHtml = document.createElement("script");
        scriptHtml.src = script.src;
        scriptHtml.type = "text/javascript";

        //remove o script encontrado da pagina
        script.remove();

        //adiciona o script criado na pagina
        document.querySelector("head").append(scriptHtml);
    });
}

function fazerLogout() {
    seguranca.removerToken();
    window.location.href = "/index.html";
}
