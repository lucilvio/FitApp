async function fazerLogin(email, senha) {
    const url = `http://localhost:3000/login`;

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }),
        headers: {
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    if(resposta.status == 400) {
        const json = await resposta.json();
        throw json;
    }

    if (resposta.ok) {
        const json = await resposta.json();
        return json;
    }
}