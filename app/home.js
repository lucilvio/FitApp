import * as servicos from "./servicosDaHome.js";
import * as paginaMestraSite from "../app/paginaMestraSite/paginaMestraSite.js";

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    await paginaMestraSite.carregar("index-conteudo.html", "Home");
    const carousel = new Carousel('#myCarousel');
    const planosAtivos = await servicos.buscarPlanosAtivos();

    planosAtivos.forEach(plano => {
        preencherCaixaPlanoHtml(plano);


    });
}
function preencherCaixaPlanoHtml(plano) {
    const planosAtivos = document.querySelector("#planos-ativos");
    const planoModelo = document.querySelector("#plano-modelo");

    const clonePlanoModeloHtml = planoModelo.firstElementChild.cloneNode(true);

    clonePlanoModeloHtml.id = plano.idPlano;
    clonePlanoModeloHtml.style.display = "block";

    clonePlanoModeloHtml.querySelector(".plano-modelo-nome").innerHTML = plano.nome;
    clonePlanoModeloHtml.querySelector(".plano-modelo-valor").innerHTML = plano.valor;
    clonePlanoModeloHtml.querySelector(".plano-modelo-duracao").innerHTML = plano.duracao;
    clonePlanoModeloHtml.querySelector(".plano-modelo-descricao").innerHTML = plano.descricao;

    planosAtivos.appendChild(clonePlanoModeloHtml);
}
