export async function tratarRespostaApi(resposta)
{
    if (resposta.ok) {
        const r = await resposta.text();

        if (r.length > 0) {
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
