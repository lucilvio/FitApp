window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    const planosAtivos = await buscarNutricionistasAtivos();

    planosAtivos.forEach(plano => {
        preencherCaixaPlanoHtml(plano);
    });
}

function preencherCaixaPlanoHtml(plano) {
    const planosAtivos = document.querySelector("#planosAtivos");
    const planoModelo = document.querySelector("#planoModelo");

    const clonePlanoModeloHtml = planoModelo.cloneNode(true);

    clonePlanoModeloHtml.id = plano.idPlano;
    clonePlanoModeloHtml.style.display = "block";

    clonePlanoModeloHtml.querySelector(".planoModelo-nome").innerHTML = plano.nome;
    clonePlanoModeloHtml.querySelector(".planoModelo-valor").innerHTML = plano.valor;
    clonePlanoModeloHtml.querySelector(".planoModelo-duracao").innerHTML = plano.duracao;
    clonePlanoModeloHtml.querySelector(".planoModelo-descricao").innerHTML = plano.descricao;

    planosAtivos.appendChild(clonePlanoModeloHtml);
}
