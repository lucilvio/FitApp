window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    document.querySelector("#btn-salvar-dados-perfil").onclick = salvarDadosDoPerfil;
    await buscarDadosDoPerfil();
}

async function buscarDadosDoPerfil() {
    try {
        const token = localStorage.getItem("fitapp_token");
        const resposta = await buscarDados(token);

        document.querySelector("#foto-perfil").setAttribute("src", "https://img1.gratispng.com/20180722/ybz/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c09380f76.0349129615323166812296.jpg")
        document.querySelector("#email").innerHTML = resposta.email;
        document.querySelector("#nome").value = resposta.nome;
        document.querySelector("#data-nascimento").value = resposta.dataNascimento;
        document.querySelector("#sexo").value = resposta.sexo;
        document.querySelector("#altura").value = resposta.altura;
    } catch (error) {
        console.error(error);
    }
}

function salvarDadosDoPerfil() {
    alert("ok")
}