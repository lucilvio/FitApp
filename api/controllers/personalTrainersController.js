const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const repositorioDePersonalTrainers = require('../repositorios/repositorioDePersonalTrainers');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');


// O Administrador cadastra um Personal Trainer
function cadastrarPersonal(req, res) {
    if(!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem o nome"});
        return;
    }
    if(!req.body.email) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem e-mail"});
        return;
    }
    if(!req.body.telefone) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem telefone"});
        return;
    }
    if(!req.body.registroProfissional) {
        res.status(400).send({ erro: "Não é possível cadastrar Personal Trainer sem o Registro Profissional"});
        return;
    }

    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorEmail(req.body.email);

    if (!personalEncontrado) {

        const novoUsuario = repositorioDeUsuarios.criarUsuario(req.body.nome, req.body.email, 'personalTrainer');

        const novoPersonalTrainer =  repositorioDePersonalTrainers.criarPersonal(novoUsuario, req.body.telefone, req.body.registroProfissional);

        servicoDeEmail.enviar(novoPersonalTrainer.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoPersonalTrainer.nome, novoUsuario.senha));

        res.send({
            IdUsuario: novoUsuario.idUsuario,
            idPersonal: novoPersonalTrainer.idPersonal,
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

// o Administrador busca por Personal Trainers - todos ou por nome
function buscarPersonal(req, res) {
    let personalTrainers = repositorioDePersonalTrainers.buscarPersonalPorFiltro(req.query.nome);

    res.send(personalTrainers.map(function (personal) {
        return {
            idPersonal: personal.idPersonal,
            nome: personal.nome,
            email: personal.email,
            telefone: personal.telefone,
            registro: personal.registro,
            status: personal.usuario.bloqueado
        }
    }));


}

function buscarPersonalPorId(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    res.send({
        idPersonal: personalEncontrado.idPersonal,
        nome: personalEncontrado.nome,
        email: personalEncontrado.email,
        telefone: personalEncontrado.telefone,
        registro: personalEncontrado.registroProfissional,
        status: personalEncontrado.usuario.bloqueado,
        imagem: personalEncontrado.usuario.imagem,
        sobreMim: personalEncontrado.sobreMim
    });
}


// O Administrador altera os dados cadastrais do Personal Trainer
function alterarDadosDoPersonal(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorId(req.params.id);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    repositorioDePersonalTrainers.salvarAlteracaoDeDados(personalEncontrado, req.body.nome, req.body.email, req.body.telefone, req.body.registroProfissional, req.body.bloqueado);

    res.send();

}

// O Personal altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorEmail(req.usuario.email);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    repositorioDePersonalTrainers.salvarAlteracaoDoPerfil(personalEncontrado, req.body.imagem, req.body.telefone);

    res.send();
}

// O Personal altera a senha
function alterarSenha(req, res) {
    const PersonalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorEmail(req.usuario.email);

    if (!PersonalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != PersonalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado" });
        return;
    }

    repositorioDePersonalTrainers.salvarNovaSenha(PersonalEncontrado, req.body.senha);

    res.send();
}

// O Personal altera informações "sobre mim"
function alterarInformacoesSobreMim(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorEmail(req.usuario.email);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != personalEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: "Não autorizado" });
        return;
    }

    repositorioDePersonalTrainers.salvarAlteraçõesSobreMim(personalEncontrado, req.body.texto)


    res.send();
}

// O Personal busca seus Alunos
function buscarAlunos(req, res) {
    const personalEncontrado = repositorioDePersonalTrainers.buscarPersonalPorEmail(req.usuario.email);

    if (!personalEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const alunos = repositorioDePersonalTrainers.buscarAlunosPorFiltro(req.query.nome, personalEncontrado.idPersonal);

    res.send(alunos.map(function (aluno) {
        return {
            idAssinante: aluno.idAssinante,
            nome: aluno.nome,
            objetivo: '',
            dieta: '',
            periodo: ''
        }
    }));
}



module.exports = {
    cadastrarPersonal: cadastrarPersonal,
    buscarPersonal: buscarPersonal,
    buscarPersonalPorId: buscarPersonalPorId,
    alterarDadosDoPersonal: alterarDadosDoPersonal,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    alterarInformacoesSobreMim: alterarInformacoesSobreMim,
    buscarAlunos : buscarAlunos
}