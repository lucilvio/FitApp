import * as servicos from "./servicosDeAssinantes.js"
import * as erros from "../util/tratamentoDeErros.js";
import * as seguranca from "../seguranca/seguranca.js";
import * as paginaMestra from "../paginaMestra/paginaMestra.js";

seguranca.deslogarSeTokenEstiverExpirado("/login/entrar.html");

window.onload = aoCarregarPagina;

async function aoCarregarPagina() {

    await paginaMestra.carregar("assinantes/assinantes-conteudo.html", "Assinantes");

    await buscarAssinantes();

    document.querySelector("#btn-pesquisar").onclick = buscarAssinantes;

}

async function buscarAssinantes() {
    try {
        const token = seguranca.pegarToken();
        const resposta = await servicos.buscarDados(token, document.querySelector("#input-pesquisar").value);

        document.querySelector("#lista-assinantes").innerHTML = "";

        if (resposta.length > 0) {
            resposta.forEach(assinante => {

                let status;

                if (assinante.bloqueado == false) {
                    status = "Desbloqueado"
                    
                } else {
                    status = "Bloqueado"
                }

                document.querySelector("#lista-assinantes").innerHTML = document.querySelector("#lista-assinantes").innerHTML +
                    `<tr>
                        <td>${assinante.nome}</td>
                        <td>${assinante.email}</td>
                        <td>${status}</td>
                        <td>
                        
                            <a href="../dadosDoAssinante/dadosDoAssinante.html?idAssinante=${assinante.idAssinante}">
                            Ver</a>
                            <i class="bi bi-eye fs-4 me-2></i>
                        </td>
                    </tr>`;
            });
        }
        else {
            document.querySelector("#lista-assinantes").innerHTML = document.querySelector("#lista-assinantes").innerHTML +
                `<tr>
                    <td colspan="4">
                        Nenhum Assinante encontrado
                    </td>
                </tr>`;
        }


    } catch (error) {
        erros.tratarErro(error);
    }
}
