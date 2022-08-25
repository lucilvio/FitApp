function gerarMensagemDeBoasVindas(nome, senha) {
    return `Olá ${nome}, <br> 
    Estamos felizes por tê-lo conosco!<br>
    Esta é a sua senha de acesso ao FitAPp: ${senha}<br><br>
    <button type="button">Entrar</button> <br><br> 
    Atenciosamente, <br> 
    Equipe FitApp`
}

module.exports = {
    gerarMensagemDeBoasVindas: gerarMensagemDeBoasVindas
}