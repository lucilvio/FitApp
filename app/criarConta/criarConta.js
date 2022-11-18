window.onload = aoCarregarPagina;

function aoCarregarPagina() {
    document.querySelector("#btn-cadastrarAssinante").onclick = cadastrarAssinante;
}

async function cadastrarAssinante() {
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const plano = "idPlano";
    const nutricionista = "idNutri";
    const personalTrainer = "idPersonal";

    try {
        await criarConta(nome, email, plano, nutricionista, personalTrainer);
        window.location.href = "../login/entrar.html";
    } catch (error) {
        alert(error.erro);
    }
}