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

    const usuario = seguranca.pegarUsuarioDoToken();

    // adiciona o nome do usuario no cabeçalho
    paginaMestraHtml.querySelector("#cabecalho-nome").innerHTML = usuario.nome;

    if (seguranca.pegarImagemDoUsuario()) {
        paginaMestraHtml.querySelector("#cabecalho-imagem-perfil").src = "http://localhost:3000/" + usuario.imagem;
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

    configurarPaginaMestraPorPerfil(usuario.perfil);
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
    seguranca.removerDadosDoUsuario();
    window.location.href = "/index.html";
}

function configurarPaginaMestraPorPerfil(perfil) {
    const configuracaoDosPerfis = [
        {
            perfil: "assinante",
            home: "/dashboard/dashboard.html",
            menuLateral: [
                { nome: "Início", icone: "bi-house-door", link: "/dashboard/dashboard.html" },
                { nome: "Medidas", icone: "bi-rulers", link: "/medidas/medidas.html" },
                { nome: "Relatórios", icone: "bi-clipboard-data", link: "/historicoDeMedidasAssinante/historicoDeMedidasAssinante.html" }
            ],
            menuCabecalho: [
                { nome: "Meu Perfil", icone: "bi-person", link: "../perfilAssinante/perfil.html" },
            ],
        },
        {
            perfil: "administrador",
            home: "/assinantes/assinantes.html",
            menuLateral: [
                { nome: "Assinantes", icone: "bi-people", link: "/assinantes/assinantes.html" },
            ]
        }
    ];

    const configuracaoDoPerfil = configuracaoDosPerfis.find(m => m.perfil == perfil);

    const logoCabecalho = document.querySelector("#logo-cabecalho");

    const aLogo = document.createElement("a");
    aLogo.classList.add("link-dark", "text-decoration-none", "d-none", "d-sm-block");
    aLogo.href = configuracaoDoPerfil.home;
    aLogo.innerHTML = `<span class="fw-bold fs-5"><img src="/img/dumbbell.png" class="me-2" alt="logo-coracao" width="40"
       height="40">FitApp</span>`

    logoCabecalho.append(aLogo);

    const logoCabecalhoOffCanvas = document.querySelector("#logo-cabecalho-off-canvas");

    const aLogoOffCanvas = document.createElement("a");
    aLogoOffCanvas.classList.add("d-block", "d-sm-none", "link-dark", "text-decoration-none");
    aLogoOffCanvas.href = configuracaoDoPerfil.home;
    aLogoOffCanvas.innerHTML = `FitApp`

    logoCabecalhoOffCanvas.append(aLogoOffCanvas);


    const menuLateral = document.querySelector("#menu-lateral");
    const menuLateralOffCanvas = document.querySelector("#menu-offCanvas");

    configuracaoDoPerfil.menuLateral.forEach(item => {
        const a = document.createElement("a");
        a.href = item.link;
        a.classList.add("list-group-item", "list-group-item-action", "border-0", "item-menu", "fw-semibold");
        a.innerHTML = `<i class="bi ${item.icone} fs-4 me-2"></i>${item.nome}`;

        const aOffCanvas = document.createElement("a");
        aOffCanvas.href = item.link;
        aOffCanvas.classList.add("list-group-item", "list-group-item-action", "border-0", "item-menu", "fw-semibold");
        aOffCanvas.innerHTML = `<i class="bi ${item.icone} fs-1 me-2"></i>${item.nome}`

        menuLateral.appendChild(a);
        menuLateralOffCanvas.appendChild(aOffCanvas);
    });

    const menuCabecalho = document.querySelector("#menu-cabecalho");

    if (configuracaoDoPerfil.menuCabecalho) {
        const liSeparador = document.createElement("li");
        liSeparador.innerHTML = `<hr class="dropdown-divider">`;

        menuCabecalho.prepend(liSeparador);

        configuracaoDoPerfil.menuCabecalho.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item" href="${item.link}"><i
                class="bi ${item.icone} me-2"></i>${item.nome}</a>`;

            menuCabecalho.prepend(li);
        });
    }


}