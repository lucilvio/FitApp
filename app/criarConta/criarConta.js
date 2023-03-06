import * as servicos from "./servicosDeCriacaoDeConta.js";
import * as erros from "../util/tratamentoDeErros.js";
import * as paginaMestraSite from "../paginaMestraSite/paginaMestraSite.js";
import * as mensagens from "../util/mensagens.js";

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    await paginaMestraSite.carregar("criarConta/criarConta-conteudo.html", "Criar conta");
    document.querySelector("#btn-cadastrarAssinante").onclick = cadastrarAssinante;
}

async function cadastrarAssinante(evento) {
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const plano = "57408fdd-8ccc-441a-953f-555dec2005bc";
    const nutricionista = "cdb6531c-0bc4-48b2-b317-dece78f5349e";
    const personalTrainer = "355049aa-1742-45d2-934d-278db5a6c224";

    const formulario = document.querySelector("#formulario");
    if (formulario.checkValidity() == false) {
        return false;
    }

    evento.preventDefault();
    try {
        await servicos.criarConta(nome, email, plano, nutricionista, personalTrainer);
        mensagens.mostrarMensagemDeSucesso("Cadastro realizado com sucesso! Verifique seu e-mail.", true);
        window.location.href = "../login/entrar.html";
    } catch (error) {
        erros.tratarErro(error);
    }
}