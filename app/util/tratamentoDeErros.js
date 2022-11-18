export function tratarErro(error) {
    if(!error.erro)
    {
        console.error(error);
    }
    else
    {
        console.error(error.erro);
    }
} 