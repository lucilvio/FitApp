import * as util from "../util/tratamentoDeRespostaApi.js"

export async function buscarDados(token) {
    const url = `http://localhost:3000/assinante/perfil`;

    const resposta = await fetch(url, {
        headers: {
            authorization: "Bearer " + token
        }
    });

    return util.tratarRespostaApi(resposta);
}

export async function salvarDados(token, nome, dataNascimento, sexo, altura) {
    const url = `http://localhost:3000/assinante/perfil`;

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                nome: nome,
                dataNascimento: dataNascimento,
                idSexo: sexo,
                altura: altura
            }),
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    return util.tratarRespostaApi(resposta);
}

export async function salvarImagem(token, imagem) {
    const url = `http://localhost:3000/usuarios/imagem`;

    const formData = new FormData();
    formData.append("imagem", imagem, imagem.name);
    
    const resposta = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            authorization: "Bearer " + token
        }
    });

    return util.tratarRespostaApi(resposta);
}

export async function alterarSenha(token, senhaAtual, novaSenha) {
    const url = `http://localhost:3000/usuarios/senha`;

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                senhaAtual: senhaAtual,
                novaSenha: novaSenha
            }),
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    return util.tratarRespostaApi(resposta);
}