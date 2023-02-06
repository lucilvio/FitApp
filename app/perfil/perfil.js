import * as servicos from "./servicosDoPerfil.js"
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";
import * as paginaMestra from "../paginaMestra/paginaMestra.js";
import * as mensagens from "../util/mensagens.js";

seguranca.deslogarSeTokenEstiverExpirado("/app/login/entrar.html");

window.onload = aoCarregarPagina;

let modal;
async function aoCarregarPagina() {
    await paginaMestra.carregar("perfil/perfil-conteudo.html", "Perfil");

    document.querySelector("#foto-perfil").onclick = alterarFoto;
    document.querySelector("#btn-salvarDadosDoPerfil").onclick = salvarDadosDoPerfil;
    document.querySelector("#btn-alterarSenha").onclick = alterarSenhaDeAcesso;
    document.querySelector("#btn-confirmarAlteracaoDeSenha").onclick = gravarNovaSenha;

    await buscarDadosDoPerfil();

    mensagens.exibirMensagemAoCarregarAPagina();
}

async function buscarDadosDoPerfil() {
    try {
        if (seguranca.pegarFotoDoUsuario()) {
            document.querySelector("#foto-perfil").setAttribute("src", "http://localhost:3000/" + seguranca.pegarFotoDoUsuario());
        }

        const token = seguranca.pegarToken();
        const resposta = await servicos.buscarDados(token);

        document.querySelector("#email").innerHTML = resposta.email;
        document.querySelector("#nome").value = resposta.nome;

        let dataFormatada;
        if (!resposta.dataNascimento) {
            dataFormatada = "";
        } else {
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
        const token = seguranca.pegarToken();

        const fotoPerfil = document.querySelector("#foto-perfil").getAttribute("src", "");
        const nome = document.querySelector("#nome").value;
        const dataNascimento = document.querySelector("#data-nascimento").value;
        const sexo = document.querySelector("#sexo").value;
        const altura = document.querySelector("#altura").value;

        const formulario = document.querySelector("#formulario-perfil");
        if (formulario.checkValidity() == false) {
            return false;
        }

        evento.preventDefault();

        await servicos.salvarDados(token, fotoPerfil, nome, dataNascimento, sexo, altura);
        seguranca.atualizarNomeUsuarioLogado(nome);
        mensagens.mostrarMensagemDeSucesso("Alteração realizada com sucesso!", true);
        window.location.reload();

    } catch (error) {
        erros.tratarErro(error);
    }

}


async function alterarSenhaDeAcesso(evento) {
    const formulario = document.querySelector("#formulario-alterar-senha");
    if (formulario.checkValidity() == false) {
        return false;
    }
    evento.preventDefault();
    if (!modal) {
        modal = new bootstrap.Modal('#modal-alterarSenha');
    }
    modal.show();
}

async function gravarNovaSenha() {
    const token = seguranca.pegarToken();
    const senhaAtual = document.querySelector("#senha-atual");
    const novaSenha = document.querySelector("#nova-senha");

    modal.hide();

    try {
        await servicos.alterarSenha(token, senhaAtual.value, novaSenha.value);
        mensagens.mostrarMensagemDeSucesso("Senha alterada com sucesso!");
        senhaAtual.value = "";
        novaSenha.value = "";
    } catch (error) {
        erros.tratarErro(error);
    }
}

function alterarFoto() {
    document.querySelector("#input-foto-perfil").click();
    document.querySelector("#input-foto-perfil").onchange = gravarFoto;
}

async function gravarFoto() {
    try {
        const token = seguranca.pegarToken();
        const inputFile = document.querySelector("#input-foto-perfil");
        const res = await servicos.salvarFoto(token, inputFile.files[0]);

        seguranca.atualizarFotoUsuarioLogado(res.foto);
        mensagens.mostrarMensagemDeSucesso("Foto alterada com sucesso!", true);
        window.location.reload();
    } catch (error) {
        erros.tratarErro(error);
    }
}