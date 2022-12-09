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

export async function salvarDados(token, fotoPerfil, nome, dataNascimento, sexo, altura) {
    const url = `http://localhost:3000/assinante/perfil`;

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                imagem: fotoPerfil,
                nome: nome,
                dataNascimento: dataNascimento,
                sexo: sexo,
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

export async function salvarFoto(token, foto) {
    const url = `http://localhost:3000/usuarios/foto`;

    const formData = new FormData();
    formData.append("foto", foto, foto.name);
    
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
    const url = `http://localhost:3000/assinante/senha`;

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