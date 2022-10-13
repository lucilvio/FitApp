const express = require('express');
const servidor = require('./servidor');
const autenticacaoMiddleware = require('./middlewares/autenticacaoMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const tratamentoDeErrosMiddleware = require('./middlewares/tratamentoDeErrosMiddleware')
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

//middlewares
servidor.app.use(express.json());

servidor.app.use(autenticacaoMiddleware.autenticar);

servidor.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


//Geral
servidor.app.post('/login', loginController.login);
servidor.app.patch('/usuarios', usuariosController.redefinirSenha);

servidor.app.get('/planos', geralController.buscarPlanos);

servidor.app.get('/nutricionistas',geralController.buscarNutricionistas);
servidor.app.get('/nutricionistas/:idNutri', geralController.buscarNutriPorId);

servidor.app.get('/personalTrainers',geralController.buscarPersonalTrainers);



servidor.app.post('/mensagem', mensagensController.enviarMensagem);
servidor.app.get('/mensagem', mensagensController.buscarMensagensPorFiltro);
servidor.app.get('/mensagens/:idMensagem', mensagensController.buscarMensagemPorId);
servidor.app.patch('/mensagens/:idMensagem', mensagensController.excluirMensagem);
servidor.app.post('/mensagens/:idMensagem', mensagensController.responderMensagem);


//Administrador
servidor.app.post('/admin/planos', autorizacao.autorizar(model.perfil.administrador), administradoresController.cadastrarPlano);
servidor.app.get('/admin/planos', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarPlanos);
servidor.app.get('/admin/planos/:idPlano', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarPlanoPorId);
servidor.app.patch('/admin/planos/:idPlano', autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarDadosDoPlano);

servidor.app.post('/admin/nutricionistas', autorizacao.autorizar(model.perfil.administrador), administradoresController.cadastrarNutricionista);
servidor.app.get('/admin/nutricionistas', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarNutricionistas);
servidor.app.get('/admin/nutricionistas/:idNutri', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarNutriPorId);
servidor.app.patch('/admin/nutricionistas/:idNutri', autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarDadosDoNutricionista);

servidor.app.post('/admin/personalTrainers', autorizacao.autorizar(model.perfil.administrador), administradoresController.cadastrarPersonal);
servidor.app.get('/admin/personalTrainers', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarPersonalTrainers);
servidor.app.get('/admin/personalTrainers/:idPersonal', administradoresController.buscarPersonalPorId);
servidor.app.patch('/admin/personalTrainers/:idPersonal', autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarDadosDoPersonal);


servidor.app.get('/admin/assinantes', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarAssinantes);
servidor.app.get('/admin/assinantes/:idAssinante', autorizacao.autorizar(model.perfil.administrador), administradoresController.buscarAssinantePorId);
servidor.app.patch('/admin/assinantes/:idAssinante', autorizacao.autorizar(model.perfil.administrador), administradoresController.alterarStatusDoAssinante);


//Nutricionista
servidor.app.get('/nutricionista/perfil', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.verDadosDoPerfil);
servidor.app.patch('/nutricionista/perfil', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarDadosDoPerfil);
servidor.app.patch('/nutricionista/senha', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarSenha);
servidor.app.patch('/nutricionista/sobreMim', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarInformacoesSobreMim);
servidor.app.get('/nutricionista/pacientes', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarPacientes);
servidor.app.get('/nutricionista/pacientes/:idAssinante', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarPacientePorId);
servidor.app.post('/nutricionista/pacientes/:idAssinante/dietas', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.criarDieta);
servidor.app.get('/nutricionista/pacientes/:idAssinante/dietas/:idDieta', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarDietaPorId);
servidor.app.patch('/nutricionista/pacientes/:idAssinante/dietas/:idDieta', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarDieta);

//Personal Trainer
servidor.app.get('/personalTrainer/perfil', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.verDadosDoPerfil);
servidor.app.patch('/personalTrainer/perfil', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarDadosDoPerfil);
servidor.app.patch('/personalTrainer/senha', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarSenha);
servidor.app.patch('/personalTrainer/sobreMim', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarInformacoesSobreMim);
servidor.app.get('/personalTrainer/alunos', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarAlunos);
servidor.app.get('/personalTrainer/alunos/:idAssinante', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarAlunoPorId);
servidor.app.post('/personalTrainer/alunos/:idAssinante/treinos', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.criarTreino);
servidor.app.get('/personalTrainer/alunos/:idAssinante/treinos/:idTreino', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarTreinoPorId);
servidor.app.patch('/personalTrainer/alunos/:idAssinante/treinos/:idTreino', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarTreino);

//Assinante
servidor.app.post('/assinantes', assinantesController.cadastrarAssinante);
servidor.app.get('/assinante/perfil', autorizacao.autorizar(model.perfil.assinante), assinantesController.verDadosDoPerfil); 
servidor.app.patch('/assinante/perfil', autorizacao.autorizar(model.perfil.assinante), assinantesController.alterarDadosDoPerfil);
servidor.app.patch('/assinante/senha', autorizacao.autorizar(model.perfil.assinante), assinantesController.alterarSenha);
servidor.app.get('/assinante/plano', autorizacao.autorizar(model.perfil.assinante), assinantesController.verDadosDoPlano);



servidor.app.use(tratamentoDeErrosMiddleware.tratarErros);
