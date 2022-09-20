const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const repositorioDeUsuarios = require('../repositorios/repositorioDeUsuarios');
const crypto = require('crypto');
const geradorDeSenha = require('generate-password');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePersonal = require('../repositorios/repositorioDePersonal');
const repositorioDeMensagens = require('../repositorios/repositorioDeMensagens');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');

//O Assinante faz o registro 
function cadastrarAssinante(req, res) {
    if (!req.body.nome) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem o nome" });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem e-mail" });
        return;
    }

    if (!req.body.idPlano) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem plano" });
        return;
    }
    if (!req.body.idNutri) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem nutricionista" });
        return;
    }
    if (!req.body.idPersonal) {
        res.status(400).send({ erro: "Não é possível cadastrar Assinante sem personal trainer" });
        return;
    }

    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.body.idPlano);
    if(!planoEncontrado) {
        res.status(400).send({ erro: "Plano não encontrado"});
        return;
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.body.idNutri);
    if(!nutriEncontrado) {
        res.status(400).send({ erro: "Nutricionista não encontrado"});
        return;
    }
    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.body.idPersonal);
    if(!personalEncontrado) {
        res.status(400).send({ erro: "Personal não encontrado"});
        return;
    }


    let novoUsuario = {
        idusuario: crypto.randomUUID(),
        nome: req.body.nome,
        login: req.body.email,
        senha: geradorDeSenha.generate({
            length: 10,
            numbers: true
        }),
        bloqueado: false,
        perfil: 'assinante'
    }

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssianantePorEmail(req.body.email);

    if (!assinanteEncontrado) {

        repositorioDeUsuarios.salvarDadosDoUsuario(novoUsuario);

        let novoAssinante = {
            idAssinante: crypto.randomUUID(),
            usuario: novoUsuario,
            nome: req.body.nome,
            email: req.body.email,
            assinatura: {
                id: crypto.randomUUID(),
                idPlano: req.body.idPlano,
            },
            nutricionista: req.body.idNutri,
            personal: req.body.idPersonal,
            dietas: [],
            treinos: []

        }

        repositorioDeAssinantes.salvarDadosDoAssinante(novoAssinante);

        servicoDeEmail.enviar(novoAssinante.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoAssinante.nome, novoUsuario.senha));


        const destinatarios = [nutriEncontrado, personalEncontrado];
        destinatarios.forEach(destinatario => {
            
            let notificacaoNovoAssinante = {
                id: crypto.randomUUID(),
                remetente: 'admin@fitapp.com',
                destinatario: destinatario.email,
                data: new Date(),
                assunto: "Novo Assinante",
                texto: servicoDeMensagens.gerarNotificacaoNovoAssinante(destinatario.nome, req.body.nome),
                excluida: false
            }
            repositorioDeMensagens.salvarMensagem(notificacaoNovoAssinante);
        })

        res.send({
            IdUsuario: novoUsuario.IdUsuario,
            idAssinante: novoAssinante.idAssinante
        });

    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}

// Buscar assinantes - todos ou por nome
function buscarAssinantes(req, res) {
    const assinantes = repositorioDeAssinantes.buscarAssinantePorFiltro(req.query.nome);

    res.send(assinantes.map(function (assinante) {
        return {
            idAssinante: assinante.idAssinante,
            nome: assinante.nome,
            email: assinante.email,
            status: assinante.usuario.bloqueado,
            idPlano: assinante.assinatura.idPlano
        }
    }));

}

// O Administrador altera o ststus do Assinante
function alterarStatusDoAssinante(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.params.id);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: "Não encontrado" });
        return;
    }

    const novoStatus = req.body.bloqueado;

    assinanteEncontrado.usuario.bloqueado = novoStatus;

    res.send(assinanteEncontrado.usuario.bloqueado)
}



module.exports = {
    cadastrarAssinante: cadastrarAssinante,
    buscarAssinantes: buscarAssinantes,
    alterarStatusDoAssinante: alterarStatusDoAssinante,
}