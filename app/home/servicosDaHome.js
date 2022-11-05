async function buscarNutricionistasAtivos() {
    const url = `http://localhost:3000/planos`;

    const resposta = await fetch(url);
    
    if(resposta.ok) {
        const json = await resposta.json();
        return json;
    }    
}