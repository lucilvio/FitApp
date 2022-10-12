const crypto = require('crypto');

function Treino(idAssinante, idPersonal, nomeTreino, dataInicio, dataFim, objetivo, exercicios) {
    if (!nomeTreino) {
        throw { mensagem: "Não é possível criar Treino sem nome", interna: true };
    }

    if (!dataInicio) {
        throw { mensagem: "Não é possível criar Treino a data de inicio", interna: true };
    }

    if (!dataFim) {
        throw { mensagem: "Não é possível criar Treino sem a data do fim", interna: true };
    }

    if (!objetivo) {
        throw { mensagem: "Não é possível criar Treino sem o objetivo", interna: true };
    }

    this.idTreino = crypto.randomUUID();
    this.idAssinante = idAssinante;
    this.idPersonal = idPersonal;
    this.ativo = true;
    this.nomeTreino = nomeTreino;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.objetivo = objetivo;
    this.exercicios = [];

    exercicios.forEach(exercicio => {
        this.exercicios.push(new ExercicioDoTreino(this.idTreino, exercicio.descricao, exercicio.diaDoTreino));
    });


    this.alterarDadosDoTreino = function (idTreino, nomeTreino, dataInicio, dataFim, objetivo, exercicios) {
        this.exercicios = [];

        if (nomeTreino != undefined && nomeTreino != null && nomeTreino != "") {
            this.nomeTreino = nomeTreino;
        }

        if (dataInicio != undefined && dataInicio != null && dataInicio != "") {
            this.dataInicio = dataInicio;
        }

        if (dataFim != undefined && dataFim != null && dataFim != "") {
            this.dataFim = dataFim;
        }

        if (objetivo != undefined && objetivo != null && objetivo != "") {
            this.objetivo = objetivo;
        }

        if (exercicios != undefined && exercicios != null && exercicios != "") {
            exercicios.forEach(exercicio => {
                this.exercicios.push(new ExercicioDoTreino(idTreino, exercicio.descricao, exercicio.diaDoTreino));
            });
           
        }

    }
}

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
    this.descricao = descricao;
    this.diaDoTreino = diaDoTreino;
}

module.exports = Treino
