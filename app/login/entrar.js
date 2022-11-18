window.onload = aoCarregarPagina;

function aoCarregarPagina() {
    document.querySelector("#btn-fazerLogin").onclick = entrar;
}

function decodificarToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function entrar() {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const formulario = document.querySelector("#formulario");

    if (formulario.checkValidity() == false) {
        return;
    }

    try {
        const resposta = await fazerLogin(email, senha);
        localStorage.setItem("fitapp_token", resposta.token);

        const usuario = decodificarToken(resposta.token);

        if(usuario.perfil == "assinante") {
           window.location.href = "../dashboard/dashboard.html" 
        }

    } catch (error) {
        alert(error.erro);
    }
}