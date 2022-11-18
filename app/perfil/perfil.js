import * as servicos from "./servicosDoPerfil.js"
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";

if(!seguranca.tokenValido()) {
    window.location.href = "/app/login/entrar.html";
}

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    document.querySelector("#btn-salvar-dados-perfil").onclick = salvarDadosDoPerfil;
    document.querySelector("#btn-alterar-senha").onclick = alterarSenhaDeAcesso;
    await buscarDadosDoPerfil();
}

async function buscarDadosDoPerfil() {
    try {
        const token = seguranca.pegarToken();
        const resposta = await servicos.buscarDados(token);

        document.querySelector("#foto-perfil").setAttribute("src", "https://img1.gratispng.com/20180722/ybz/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c09380f76.0349129615323166812296.jpg")
        document.querySelector("#email").innerHTML = resposta.email;
        document.querySelector("#nome").value = resposta.nome;

        let dataFormatada;
        if (!resposta.dataNascimento) {
            dataFormatada = "";
        } else{
            const data = new Date(resposta.dataNascimento);
            const zeroEsquerda = (data.getMonth() + 1) < 10 ? '0' : '';
            dataFormatada = zeroEsquerda + (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear()
        }
        document.querySelector("#data-nascimento").value = dataFormatada;
        document.querySelector("#sexo").value = resposta.sexo;
        document.querySelector("#altura").value = resposta.altura;
    } catch (error) {
        erros.tratarErro(error);
    }
}

async function salvarDadosDoPerfil(evento) {
    try {
        evento.preventDefault();

        const token = seguranca.pegarToken();

        const fotoPerfil = document.querySelector("#foto-perfil").getAttribute("src", "");
        const nome = document.querySelector("#nome").value;
        const dataNascimento = document.querySelector("#data-nascimento").value;
        const sexo = document.querySelector("#sexo").value;
        const altura = document.querySelector("#altura").value;

        await servicos.salvarDados(token, fotoPerfil, nome, dataNascimento, sexo, altura);
        await buscarDadosDoPerfil()
    } catch (error) {
        erros.tratarErro(error);
    }

}

async function alterarSenhaDeAcesso(evento) {
    try {
        evento.preventDefault();

        const token = seguranca.pegarToken();
        const senhaAtual = document.querySelector("#senha-atual").value;
        const novaSenha = document.querySelector("#nova-senha").value;

        await servicos.alterarSenha(token, senhaAtual, novaSenha);
    } catch (error) {
        erros.tratarErro(error);
    }
}