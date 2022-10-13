const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const servicoDeEmail = require('../servicos/servicoDeEmail');
const servicoDeMensagens = require('../servicos/servicoDeMensagens');
const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDePersonal = require('../repositorios/repositorioDePersonalTrainers');
const repositorioDePlanos = require('../repositorios/repositorioDePlanos');
const Assinante = require('../model/assinante');

//O Assinante faz o registro 
function cadastrarAssinante(req, res) {
    const planoEncontrado = repositorioDePlanos.buscarPlanoPorId(req.body.idPlano);
    if (!planoEncontrado) {
        res.status(400).send({ erro: "Plano não encontrado" });
        return;
    }

    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.body.idNutri);
    if (!nutriEncontrado) {
        res.status(400).send({ erro: "Nutricionista não encontrado" });
        return;
    }

    const personalEncontrado = repositorioDePersonal.buscarPersonalPorId(req.body.idPersonal);
    if (!personalEncontrado) {
        res.status(400).send({ erro: "Personal não encontrado" });
        return;
    }

    const assinanteEncontrado = repositorioDeAssinantes.buscarAssianantePorEmail(req.body.email);
    if (!assinanteEncontrado) {
        const novoAssinante = new Assinante(req.body.nome, req.body.email, req.body.idPlano, req.body.idNutri, req.body.idPersonal);

        repositorioDeAssinantes.criarAssinante(novoAssinante);

        servicoDeEmail.enviar(novoAssinante.email, 'Bem vindo ao FitApp', servicoDeMensagens.gerarMensagemDeBoasVindas(novoAssinante.nome, novoAssinante.usuario.senha));

        res.send({
            idAssinante: novoAssinante.idAssinante
        });
    } else {
        res.status(400).send({ erro: "Esse e-mail já foi cadastrado" });
    }

}
// O Assinante ver os dados do perfil
function verDadosDoPerfil(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: 'Assinante não encontrado' });
        return;
    }

    if (req.usuario.idUsuario != assinanteEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }
    res.send({
        idAssinante: assinanteEncontrado.idAssinante,
        imagem: assinanteEncontrado.usuario.imagem,
        email: assinanteEncontrado.usuario.login,
        nome: assinanteEncontrado.nome,
        dataNascimento: assinanteEncontrado.dataNascimento,
        sexo: assinanteEncontrado.sexo,
        altura: assinanteEncontrado.altura,
        plano: assinanteEncontrado.assinatura.idPlano,
        nutricionista: assinanteEncontrado.nutricionista,
        personalTrainer: assinanteEncontrado.personalTrainer
    })

}

// O Assinante altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const assinanteEncontrado = repositorioDeAssinantes.buscarAssinantePorId(req.usuario.idUsuario);

    if (!assinanteEncontrado) {
        res.status(404).send({ erro: 'Assinante não encontrado' });
        return;
    }

    if (req.usuario.idUsuario != assinanteEncontrado.usuario.idUsuario) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    assinanteEncontrado.alterarDadosDoPerfil(req.body.imagem, req.body.dataNascimento, req.body.sexo, req.body.altura);

    repositorioDeAssinantes.salvarAlteracaoDeDados(assinanteEncontrado);
    res.send();
}





module.exports = {
    cadastrarAssinante: cadastrarAssinante,
    verDadosDoPerfil: verDadosDoPerfil,
    alterarDadosDoPerfil: alterarDadosDoPerfil
    
}