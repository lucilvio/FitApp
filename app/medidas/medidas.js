import * as servicos from "./servicosDeMedidas.js";
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";

if(!seguranca.tokenValido()) {
    window.location.href = "/app/login/entrar.html";
}

window.onload = aoCarregarPagina;

function aoCarregarPagina() {
    document.querySelector("#btn-salvarMedidas").onclick = inserirMedidas;
}

async function inserirMedidas(evento) {
    const peso = document.querySelector("#peso").value;
    const pescoco = document.querySelector("#pescoco").value;
    const cintura = document.querySelector("#cintura").value;
    const quadril = document.querySelector("#quadril").value;
    const token = seguranca.pegarToken();

    const formulario = document.querySelector("#formulario");
    if (formulario.checkValidity() == false) {
        return false;
    }

    evento.preventDefault();

    try {
        await servicos.salvarMedidas(token, peso, pescoco, cintura, quadril);
        alert("ok");
    } catch (error) {
        erros.tratarErro(error);
    }
}