import * as servicos from "./servicosDeLogin.js";
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js"

window.onload = aoCarregarPagina;

function aoCarregarPagina() {
    document.querySelector("#btn-fazerLogin").onclick = entrar;
}

async function entrar(evento) {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const formulario = document.querySelector("#formulario");

    if (formulario.checkValidity() == false) {
        return false;
    }

    evento.preventDefault();

    try {
        const resposta = await servicos.fazerLogin(email, senha);
        seguranca.gravarToken(resposta.token);
        
        const usuario = seguranca.pegarUsuarioDoToken(resposta.token);

        if(usuario.perfil == "assinante") {
           window.location.href = "../dashboard/dashboard.html" 
        }

    } catch (error) {
        erros.tratarErro(error);
    }
}