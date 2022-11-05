async function cadastrarAssinante(nome, email) {
    const url = `http://localhost:3000/assinantes`;

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(
            {
                nome: nome,
                email: email,
                idPlano: "idPlano",
                idNutri: "idNutri",
                idPersonal: "idPersonal"
            }),
        headers: {
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);

    if (resposta.ok) {
        const json = await resposta.json();
        return json;
    }
}