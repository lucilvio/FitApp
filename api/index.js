const servidor = require('./servidor');
const loginController = require('./controllers/loginController');
const nutricionistasController = require('./controllers/nutricionistasController');
const personalTrainersController = require('./controllers/personalTrainersController');
const planosController = require('./controllers/planosController');
const assinantesController = require('./controllers/assinantesController');
const mensagensController = require('./controllers/mensagensController');
const autorizacao = require('./seguranca/autorizacao');
const model = require('./model/perfis');




servidor.app.post('/login', loginController.login);
servidor.app.post('/nutricionista', autorizacao.autorizar(model.perfil.administrador), nutricionistasController.cadastrarNutricionista);
servidor.app.get('/nutricionista', autorizacao.autorizar(model.perfil.administrador), nutricionistasController.buscarNutricionistas);
servidor.app.get('/nutricionista/:id', nutricionistasController.buscarNutriPorId);
servidor.app.patch('/nutricionista/:id', autorizacao.autorizar(model.perfil.administrador), nutricionistasController.alterarDadosDoNutricionista);
servidor.app.post('/personal', autorizacao.autorizar(model.perfil.administrador), personalTrainersController.cadastrarPersonal);
servidor.app.get('/personal', autorizacao.autorizar(model.perfil.administrador), personalTrainersController.buscarPersonal);
servidor.app.patch('/personal/:id', autorizacao.autorizar(model.perfil.administrador), personalTrainersController.alterarDadosDoPersonal);
servidor.app.post('/plano', autorizacao.autorizar(model.perfil.administrador), planosController.cadastrarPlano);
servidor.app.get('/plano', autorizacao.autorizar(model.perfil.administrador), planosController.buscarPlanos);
servidor.app.get('/plano/:id', planosController.buscarPlanoPorId);
servidor.app.patch('/plano/:id', autorizacao.autorizar(model.perfil.administrador), planosController.alterarPlano);
servidor.app.post('/assinante', assinantesController.cadastrarAssinante);
servidor.app.get('/assinante', assinantesController.buscarAssinantes);
servidor.app.patch('/assinante/:id', autorizacao.autorizar(model.perfil.administrador), assinantesController.alterarStatusDoAssinante);
servidor.app.post('/mensagem', mensagensController.enviarMensagem);
servidor.app.get('/mensagem', mensagensController.buscarMensagensPorFiltro);
servidor.app.get('/mensagem/:idMensagem', mensagensController.buscarMensagemPorId);
servidor.app.patch('/mensagem/:idMensagem', mensagensController.excluirMensagem);
servidor.app.post('/mensagem/:idMensagem', mensagensController.responderMensagem);

