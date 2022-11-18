async function buscarDados(token) {
    const url = `http://localhost:3000/assinante/perfil`;

    const resposta = await fetch(url, {
        headers: {
            authorization: "Bearer " + token
        }
    });

    if (resposta.ok) {
        const r = await resposta.text();

        if(r.length > 0)
        {
            return JSON.parse(r);            
        }
        else {
            return;
        }
    } else {
        const json = await resposta.json();
        throw json;
    }
}