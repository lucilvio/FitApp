function Idade(dataNascimento) {
    if (!dataNascimento) {
        this.valor = 0;
        return;
    }

    const dataAtual = new Date().getTime();
    const dataSubtraidaEmMilessegundos = dataAtual - this.dataNascimento
    this.valor = Math.floor(dataSubtraidaEmMilessegundos / 31536000000);
}

module.exports = Idade;