
window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    document.querySelector("#foto-perfil").onclick = mostrarMenu;
    await buscarDadosDoPerfil();
}

async function buscarDadosDoPerfil() {
    try {
        const token = localStorage.getItem("fitapp_token");
        const resposta = await buscarDados(token);
        const data = new Date();

        document.querySelector("#nome").innerHTML = resposta.nome;
        document.querySelector("#data").innerHTML = data;
        document.querySelector("#altura").innerHTML = resposta.altura;
        document.querySelector("#peso").innerHTML = resposta.peso;
        document.querySelector("#idade").innerHTML = resposta.idade;
        document.querySelector("#imc").innerHTML = resposta.imc;
    } catch (error) {
        console.error(error);
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