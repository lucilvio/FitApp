import * as servicos from "./servicosDeMedidas.js";
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";
import * as paginaMestra from "../paginaMestra/paginaMestra.js";


if (!seguranca.tokenValido()) {
    window.location.href = "/app/login/entrar.html";
}

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {
    await paginaMestra.carregar("medidas/medidas-conteudo.html", "Medidas");
    await buscarMedidas();
    document.querySelector("#btn-salvarMedidas").onclick = inserirMedidas;
}

async function buscarMedidas() {
    try {
        const token = seguranca.pegarToken();
        const resposta = await servicos.buscarDados(token);

        document.querySelector("#peso").innerHTML = resposta.medidasAtuais.peso;
        document.querySelector("#pescoco").innerHTML = resposta.medidasAtuais.pescoco;
        document.querySelector("#cintura").innerHTML = resposta.medidasAtuais.cintura;
        document.querySelector("#quadril").innerHTML = resposta.medidasAtuais.quadril;
        resposta.historicoMedidas.forEach(medida => {

            document.querySelector("#historico-medidas").innerHTML = document.querySelector("#historico-medidas").innerHTML +
                `<tr>
            <td>${new Date(medida.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
            <td>${medida.peso} kg</td>
            <td>${medida.pescoco} cm</td>
            <td>${medida.cintura} cm</td>
            <td>${medida.quadril} cm</td>
            <td><i id="editar-medidas" class="bi bi-pencil-square"></i></td>
            <td><i id="excluir-medidas" class="bi bi-trash3"></i></td>
            </tr>`;
        });


    } catch (error) {
        erros.tratarErro(error);
    }
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
    } catch (error) {
        erros.tratarErro(error);
    }
}