async function salvarMedidas(token, peso, pescoco, cintura, quadril) {
    const url = `http://localhost:3000/assinante/medidas`;

    const request = new Request(url, {
        method: 'POST',        
        body: JSON.stringify(
            {
                peso: peso,
                pescoco: pescoco,
                cintura: cintura,
                quadril: quadril
            }),
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }

    });

    const resposta = await fetch(request);
    
    if (resposta.ok) {
        const r = await resposta.text();

        if(r.length > 0)
        {
            const json = await resposta.json();
            return json;            
        }
        else {
            return;
        }
    } else {
        const json = await resposta.json();
        throw json;
    }
}