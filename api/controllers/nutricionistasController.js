const repositorioDeNutricionistas = require('../repositorios/repositorioDeNutricionistas');
const repositorioDeAssinantes = require('../repositorios/repositorioDeAssinantes');
const Dieta = require('../model/dieta');

// O Nutricionista ver os dados do perfil
function verDadosDoPerfil(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.usuario.idUsuario);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: 'Nutricionista não encontrado' });
        return;
    }

    res.send({
        idNutri: nutriEncontrado.idNutri,
        imagem: nutriEncontrado.usuario.imagem,
        email: nutriEncontrado.usuario.login,
        nome: nutriEncontrado.nome,
        registroProfissional: nutriEncontrado.registroProfissional,
        telefone: nutriEncontrado.telefone,
        sobreMim: nutriEncontrado.sobreMim
    })

}

// O Nutricionista altera dados do perfil
function alterarDadosDoPerfil(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.usuario.idUsuario);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: 'Nutricionista não encontrado' });
        return;
    }

    nutriEncontrado.alterarDadosDoPerfil(req.body.telefone, req.body.imagem);

    repositorioDeNutricionistas.salvarAlteracaoDeDados(nutriEncontrado);
    res.send();
}

// O nutricionista altera a senha
function alterarSenha(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.usuario.idUsuario);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: 'Nutricionista não encontrado' });
        return;
    }

    nutriEncontrado.alterarSenha(req.body.senha);

    repositorioDeNutricionistas.salvarAlteracaoDeDados(nutriEncontrado);
    res.send();
}

// O Nutricionista altera informações "sobre mim"
function alterarInformacoesSobreMim(req, res) {
    const nutriEncontrado = repositorioDeNutricionistas.buscarNutriPorId(req.usuario.idUsuario);

    if (!nutriEncontrado) {
        res.status(404).send({ erro: 'Nutricionista não encontrado' });
        return;
    }

    nutriEncontrado.alterarSobreMim(req.body.texto);

    repositorioDeNutricionistas.salvarAlteracaoDeDados(nutriEncontrado);
    res.send();
}

// O nutricionista busca seus pacientes
function buscarPacientes(req, res) {
    const pacientes = repositorioDeNutricionistas.buscarPacientesPorFiltro(req.query.nome, req.usuario.email);

    res.send(pacientes.map(function (paciente) {
        return {
            idAssinante: paciente.idAssinante,
            nome: paciente.nome,
            objetivo: '',
            dieta: '',
            periodo: ''
        }
    }));
}

//O Nutricionista ver dados do Paciente
function buscarPacientePorId(req, res) {
    const pacienteEncontrado = repositorioDeNutricionistas.buscarPacientePorId(req.params.idAssinante);

    if (!pacienteEncontrado) {
        res.status(404).send({ erro: "Paciente não encontrado" });
        return;
    }
    
    if (req.usuario.idUsuario != pacienteEncontrado.nutricionista) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }
   

    res.send({
        nome: pacienteEncontrado.nome,
        objetivo: pacienteEncontrado.objetivo,
        dataNascimento: pacienteEncontrado.dataNascimento,
        sexo: pacienteEncontrado.sexo,
        altura: pacienteEncontrado.altura,
        medidas: pacienteEncontrado.medidas,
        dietas: pacienteEncontrado.dietas

    });

}

// O Nutricionista cria dieta
function criarDieta(req, res) {
    const pacienteEncontrado = repositorioDeNutricionistas.buscarPacientePorId(req.params.idAssinante);

    if (!pacienteEncontrado) {
        res.status(404).send({ erro: 'Paciente não encontrado' });
        return;
    }

    if (req.usuario.idUsuario == pacienteEncontrado.nutricionista) {

        const dieta = new Dieta(req.params.idAssinante, req.usuario.idUsuario, req.body.nomeDieta, req.body.dataInicio, req.body.dataFim, req.body.objetivo, req.body.itens);
        pacienteEncontrado.inserirDieta(dieta);
        repositorioDeAssinantes.salvarDieta(pacienteEncontrado);

        res.send({ idDieta: dieta.idDieta });

    } else {
        res.status(400).send({ erro: "Não é possivel criar dieta " })
    }
}

function buscarDietaPorId(req, res) {

    const pacienteEncontrado = repositorioDeNutricionistas.buscarPacientePorId(req.params.idAssinante);

    if (!pacienteEncontrado) {
        res.status(404).send({ erro: "Paciente não encontrado" });
        return;
    }

    if (req.usuario.idUsuario != pacienteEncontrado.nutricionista) {
        res.status(401).send({ erro: 'Não autorizado' });
        return;
    }

    const dietaEncontrada = repositorioDeNutricionistas.buscarDietaPorId(req.params.idAssinante, req.params.idDieta);

    if (!dietaEncontrada) {
        res.status(404).send({ erro: "Dieta não encontrada" });
        return;
    }

    res.send(dietaEncontrada);

}


function alterarDieta(req, res) {
    const pacienteEncontrado = repositorioDeNutricionistas.buscarPacientePorId(req.params.idAssinante);
    if (!pacienteEncontrado) {
        res.status(404).send({ erro: "Paciente não encontrado" });
        return;
    }

    const dietaEncontrada = repositorioDeNutricionistas.buscarDietaPorId(req.params.idAssinante, req.params.idDieta);
    if (!dietaEncontrada) {
        res.status(404).send({ erro: "Dieta não encontrada" });
        return;
    }

    if (req.usuario.idUsuario == pacienteEncontrado.nutricionista) {
        dietaEncontrada.alterarDadosDaDieta(req.params.idDieta, req.body.nomeDieta, req.body.dataInicio, req.body.dataFim, req.body.objetivo, req.body.itens);
    
        repositorioDeNutricionistas.salvarAlteracoesDaDieta(dietaEncontrada);
    
        res.send();

    }else {
        res.status(400).send({ erro: "Não é possivel alterar dieta " })
    }

}

module.exports = {
    buscarDadosDoPerfil: verDadosDoPerfil,
    alterarDadosDoPerfil: alterarDadosDoPerfil,
    alterarSenha: alterarSenha,
    alterarInformacoesSobreMim: alterarInformacoesSobreMim,
    buscarPacientes: buscarPacientes,
    buscarPacientePorId: buscarPacientePorId,
    criarDieta: criarDieta,
    buscarDietaPorId: buscarDietaPorId,
    alterarDieta: alterarDieta,
}


