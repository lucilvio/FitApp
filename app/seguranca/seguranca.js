const chaveToken = "fitapp_token";
const chaveNomeUsuario = "fitapp_nome_usuario";
const chaveFotoUsuario = "fitapp_foto_usuario";

export function tokenValido() {
    const token = pegarToken();

    if(!token) {
        return false;
    }

    if(tokenExpirado(token) == true) {
        return false;
    }

    return true;
}

export function gravarToken(token) {
    localStorage.setItem(chaveToken, token);
    localStorage.setItem(chaveNomeUsuario, pegarUsuarioDoToken().nome);
    localStorage.setItem(chaveFotoUsuario, pegarUsuarioDoToken().imagem);
}

export function pegarToken() {
    return localStorage.getItem(chaveToken);
}

export function removerToken() {
    localStorage.removeItem(chaveToken);
}

export function pegarUsuarioDoToken() {
    const token = pegarToken();

    const tokenDecodificado = decodificarToken(token);

    return {
        idUsuario: tokenDecodificado.idUsuario,
        nome: tokenDecodificado.nome,
        email: tokenDecodificado.email,
        perfil: tokenDecodificado.perfil,
        imagem: tokenDecodificado.imagem
    }
}

export function atualizarNomeUsuarioLogado(nome) {
    localStorage.setItem(chaveNomeUsuario, nome);
}

export function atualizarFotoUsuarioLogado(foto) {
    localStorage.setItem(chaveFotoUsuario, foto);
}

export function pegarNomeDoUsuario() {
    return localStorage.getItem(chaveNomeUsuario);
}

export function pegarFotoDoUsuario() {
    return localStorage.getItem(chaveFotoUsuario);
}

function decodificarToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function tokenExpirado(token) {
    const tokenDecodificado = decodificarToken(token);
    const dataAtual = new Date().getTime() / 1000;

    if(dataAtual > tokenDecodificado.exp) {
        return true;
    }

    return false;
}

