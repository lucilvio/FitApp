function Imc(peso, altura) {

    if (peso == 0) {
        this.valor = 0
        return;
    }

    if (altura == 0) {
        this.valor = 0
        return;
    }

    const alturaConvertida = (altura * altura) / 100;

    this.valor = peso / alturaConvertida;
}

module.exports = {
    Imc: Imc
};