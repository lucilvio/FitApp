const crypto = require('crypto');

function ExercicioDoTreino(idTreino, descricao, diaDoTreino) {
    if (!idTreino) {
        throw { mensagem: "Não é possível adicionar exercício sem o id do treino", interna: true };
    }

    if (!descricao) {
        throw { mensagem: "Não é possível adicionar exercício sem descrição", interna: true };
    }

    if (!diaDoTreino) {
        throw { mensagem: "Não é possível adicionar exercício sem o dia do treino", interna: true };
    }

    this.idTreino = idTreino;
    this.idExercicio = crypto.randomUUID();
    this.descricao = descricao;
    this.diaDoTreino = diaDoTreino;
}


module.exports = {
    ExercicioDoTreino: ExercicioDoTreino
}