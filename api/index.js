const express = require('express');
const fileUpload = require('express-fileupload');
const servidor = require('./servidor');
const autenticacaoMiddleware = require('./middlewares/autenticacaoMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const tratamentoDeErrosMiddleware = require('./middlewares/tratamentoDeErrosMiddleware')
const esqueciMinhaSenhaController = require('./controllers/esqueciMinhaSenhaController');
const loginController = require('./controllers/loginController');
const usuariosController = require('./controllers/usuariosController');
const administradoresController = require('./controllers/administradoresController');
const nutricionistasController = require('./controllers/nutricionistasController');
const personalTrainersController = require('./controllers/personalTrainersController');
const assinantesController = require('./controllers/assinantesController');
const mensagensController = require('./controllers/mensagensController');
const autorizacao = require('./seguranca/autorizacao');
const model = require('./model/perfis');
const geralController = require('./controllers/geralController');
const cors = require('cors');

//middlewares
servidor.app.use(cors());
servidor.app.use(express.urlencoded({ limit: "50mb", extended: true}));
servidor.app.use(express.json({ limit: "50mb", extended: true }));
servidor.app.use(fileUpload({ createParentPath: true }));
servidor.app.use(autenticacaoMiddleware.autenticar);
servidor.app.use("/publico", express.static("imagens"));

servidor.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


//Geral
servidor.app.post('/esqueciMinhaSenha', async (req, res) => await tratarErros(req, res, esqueciMinhaSenhaController.gerarNovaSenha));
servidor.app.post('/login', async (req, res) => await tratarErros(req, res, loginController.login));
servidor.app.patch('/usuarios/senha', async (req, res) => await tratarErros(req, res, usuariosController.alterarSenha));
servidor.app.post('/usuarios/foto', async (req, res) => await tratarErros(req, res, usuariosController.alterarFoto));
servidor.app.get('/planos', async (req, res) => await tratarErros(req, res, geralController.buscarPlanos));
servidor.app.get('/planos/:idPlano', async (req, res) => await tratarErros(req, res, geralController.buscarPlanoPorId));

servidor.app.get('/nutricionistas', async (req, res) => await tratarErros(req, res, geralController.buscarNutricionistas));
servidor.app.get('/nutricionistas/:idNutri', async (req, res) => await tratarErros(req, res, geralController.buscarNutriPorId));

servidor.app.get('/personalTrainers', async (req, res) => await tratarErros(req, res, geralController.buscarPersonalTrainers));
servidor.app.get('/personalTrainers/:idPersonal', async (req, res) => await tratarErros(req, res, geralController.buscarPersonalPorId));



servidor.app.post('/mensagem', async (req, res) => await tratarErros(req, res, mensagensController.enviarMensagem));
servidor.app.get('/mensagem/recebidas', async (req, res) => await tratarErros(req, res, mensagensController.buscarMensagensRecebidas));
servidor.app.get('/mensagem/enviadas', async (req, res) => await tratarErros(req, res, mensagensController.buscarMensagensEnviadas));
servidor.app.get('/mensagem/excluidas', async (req, res) => await tratarErros(req, res, mensagensController.buscarMensagensExcluidas));
servidor.app.get('/mensagens/:idMensagem', async (req, res) => await tratarErros(req, res, mensagensController.buscarMensagemPorId));
servidor.app.delete('/mensagens/:idMensagem', async (req, res) => await tratarErros(req, res, mensagensController.excluirMensagem));
servidor.app.post('/mensagens/:idMensagem', async (req, res) => await tratarErros(req, res, mensagensController.responderMensagem));


//Administrador
servidor.app.post('/admin/planos', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.cadastrarPlano));
servidor.app.get('/admin/planos', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarPlanos));
servidor.app.get('/admin/planos/:idPlano', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarPlanoPorId));
servidor.app.patch('/admin/planos/:idPlano', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarDadosDoPlano));

servidor.app.post('/admin/nutricionistas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.cadastrarNutricionista));
servidor.app.get('/admin/nutricionistas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarNutricionistas));
servidor.app.get('/admin/nutricionistas/:idNutri', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarNutriPorId));
servidor.app.patch('/admin/nutricionistas/:idNutri', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarDadosDoNutricionista));

servidor.app.post('/admin/personalTrainers', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.cadastrarPersonal));
servidor.app.get('/admin/personalTrainers', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarPersonalTrainers));
servidor.app.get('/admin/personalTrainers/:idPersonal', async (req, res) => await tratarErros(req, res, administradoresController.buscarPersonalPorId));
servidor.app.patch('/admin/personalTrainers/:idPersonal', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarDadosDoPersonal));


servidor.app.get('/admin/assinantes', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarAssinantes));
servidor.app.get('/admin/assinantes/:idAssinante', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarAssinantePorId));
servidor.app.patch('/admin/assinantes/:idAssinante', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarStatusDoAssinante));


//Nutricionista
servidor.app.get('/nutricionista/perfil', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarDadosDoPerfil));
servidor.app.patch('/nutricionista/perfil', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarDadosDoPerfil));
servidor.app.patch('/nutricionista/sobreMim', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarInformacoesSobreMim));
servidor.app.get('/nutricionista/pacientes', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarPacientes));
servidor.app.get('/nutricionista/pacientes/:idAssinante', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarPacientePorId));
servidor.app.get('/nutricionista/pacientes/:idAssinante/medidas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarMedidasDoPaciente));
servidor.app.post('/nutricionista/pacientes/:idAssinante/dietas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.criarDieta));
servidor.app.get('/nutricionista/pacientes/:idAssinante/dietas/:idDieta', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarDietaPorId));
servidor.app.patch('/nutricionista/pacientes/:idAssinante/dietas/:idDieta', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarDieta));

//Personal Trainer
servidor.app.get('/personalTrainer/perfil', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarDadosDoPerfil));
servidor.app.patch('/personalTrainer/perfil', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarDadosDoPerfil));
servidor.app.patch('/personalTrainer/sobreMim', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarInformacoesSobreMim));
servidor.app.get('/personalTrainer/alunos', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarAlunos));
servidor.app.get('/personalTrainer/alunos/:idAssinante', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarAlunoPorId));
servidor.app.get('/personalTrainer/alunos/:idAssinante/medidas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarMedidasDoAluno));
servidor.app.post('/personalTrainer/alunos/:idAssinante/treinos', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.criarTreino));
servidor.app.get('/personalTrainer/alunos/:idAssinante/treinos/:idTreino', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarTreinoPorId));
servidor.app.patch('/personalTrainer/alunos/:idAssinante/treinos/:idTreino', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarTreino));

//Assinante
servidor.app.post('/assinantes', async (req, res) => await tratarErros(req, res, assinantesController.cadastrarAssinante));
servidor.app.get('/assinante/dashboard', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDadosDoDashboard)); 
servidor.app.get('/assinante/perfil', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDadosDoPerfil)); 
servidor.app.patch('/assinante/perfil', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.alterarDadosDoPerfil));
servidor.app.get('/assinante/perfil/nutricionistas/:idNutri', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDadosDoNutri)); 
servidor.app.get('/assinante/perfil/personalTrainers/:idPersonal', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDadosDoPersonal)); 
servidor.app.get('/assinante/assinaturas/:idAssinatura', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDadosDaAssinatura));
servidor.app.delete('/assinante/assinaturas/:idAssinatura', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.cancelarAssinatura));
servidor.app.patch('/assinante/assinaturas/:idAssinatura', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.alterarPlanoDaAssinatura));
servidor.app.patch('/assinante/assinaturas/:idAssinatura', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.alterarPlanoDaAssinatura));
servidor.app.post('/assinante/medidas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.inserirMedidas));
servidor.app.get('/assinante/medidas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarMedidas));
servidor.app.delete('/assinante/medidas/:idMedida', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.excluirMedidas));
servidor.app.get('/assinante/dietas', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDietas));
servidor.app.get('/assinante/dietas/:idDieta', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarDietaPorId));
servidor.app.get('/assinante/treinos', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarTreinos));
servidor.app.get('/assinante/treino/:idTreino', async (req, res) => await tratarErros(req, res, autorizacao.autorizar(model.perfil.assinante), assinantesController.buscarTreinoPorId));



servidor.app.use(tratamentoDeErrosMiddleware.tratarErros);

async function tratarErros(req, res, action) {
    try {
        await action(req, res);
    } catch (error) {
        if (error.interna) {
            res.status(400).send({ erro: error.mensagem });
        }
        else {
            res.status(500).send({ erro: "Houve um erro interno, tente novamente mais tarde" });
            console.log(error);
        }
    }
}
