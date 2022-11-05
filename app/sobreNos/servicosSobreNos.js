async function buscarNutricionistasAtivos() {
    const url = `http://localhost:3000/nutricionistas`;

    const resposta = await fetch(url);
    
    if(resposta.ok) {
        const json = await resposta.json();
        return json;
    }    
}

async function buscarPersonalTrainersAtivos() {
    const url = `http://localhost:3000/personalTrainers`;

    const resposta = await fetch(url);
    
    if(resposta.ok) {
        const json = await resposta.json();
        return json;
    }    
}