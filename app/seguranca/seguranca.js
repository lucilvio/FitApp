const chaveToken = "fitapp_token";

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

export function pegarToken() {
    return localStorage.getItem(chaveToken);
}

export function removerToken() {
    localStorage.removeItem(chaveToken);
}

export function pegarUsuarioDoToken(token) {
    const tokenDecodificado = decodificarToken(token);

    return {
        idUsuario: tokenDecodificado.idUsuario,
        nome: tokenDecodificado.nome,
        email: tokenDecodificado.email,
        perfil: tokenDecodificado.perfil
    }
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