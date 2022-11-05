window.onload = aoCarregarPagina;

function aoCarregarPagina() {
    document.querySelector("#btn-cadastrarAssinante").onclick = criarConta;
}

async function criarConta() {
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;

    await cadastrarAssinante(nome, email);
}