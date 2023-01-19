import * as servicos from "./servicosDeCriacaoDeConta.js";
import * as erros from "../util/tratamentoDeErros.js";
import * as paginaMestraSite from "../paginaMestraSite/paginaMestraSite.js";

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    await paginaMestraSite.carregar("criarConta/criarConta-conteudo.html", "Criar conta");
    document.querySelector("#btn-cadastrarAssinante").onclick = cadastrarAssinante;
}

async function cadastrarAssinante(evento) {
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const plano = "idPlano";
    const nutricionista = "idNutri";
    const personalTrainer = "idPersonal";

    const formulario = document.querySelector("#formulario");
    if (formulario.checkValidity() == false) {
        return false;
    }

    evento.preventDefault();
    try {
        await servicos.criarConta(nome, email, plano, nutricionista, personalTrainer);
        window.location.href = "../login/entrar.html";
    } catch (error) {
        erros.tratarErro(error);
    }
}