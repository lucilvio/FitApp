window.onload = aoCarregarPagina;

function aoCarregarPagina() {
    document.querySelector("#btn-salvarMedidas").onclick = inserirMedidas;
}

async function inserirMedidas() {
    const peso = document.querySelector("#peso").value;
    const pescoco = document.querySelector("#pescoco").value;
    const cintura = document.querySelector("#cintura").value;
    const quadril = document.querySelector("#quadril").value;
    const token = localStorage.getItem("fitapp_token");
    

    try {
        await salvarMedidas(token, peso, pescoco, cintura, quadril);
        alert("ok");
    } catch (error) {
        alert(error.erro);
    }
}