const servidor = require('./servidor');
const loginController = require('./controllers/loginController');
const nutricionistaController = require('./controllers/nutricionistaController');
const personalController = require('./controllers/personalController');
const planoController = require('./controllers/planoController');
const assinanteController = require('./controllers/assinanteController');
const mensagemController = require('./controllers/mensagemController');
const autorizacao = require('./seguranca/autorizacao');
const model = require('./model/perfis');




servidor.app.post('/login', loginController.login);
servidor.app.post('/nutricionista', autorizacao.autorizar(model.perfil.administrador), nutricionistaController.cadastrarNutricionista);
servidor.app.get('/nutricionista', autorizacao.autorizar(model.perfil.administrador), nutricionistaController.buscarNutricionistas);
servidor.app.get('/nutricionista/:id', nutricionistaController.buscarNutriPorId);
servidor.app.patch('/nutricionista/:id', autorizacao.autorizar(model.perfil.administrador), nutricionistaController.alterarDadosDoNutricionista);
servidor.app.post('/personal', autorizacao.autorizar(model.perfil.administrador), personalController.cadastrarPersonal);
servidor.app.get('/personal', autorizacao.autorizar(model.perfil.administrador), personalController.buscarPersonal);
servidor.app.patch('/personal/:id', autorizacao.autorizar(model.perfil.administrador), personalController.alterarDadosDoPersonal);
servidor.app.post('/plano', autorizacao.autorizar(model.perfil.administrador), planoController.cadastrarPlano);
servidor.app.get('/plano', autorizacao.autorizar(model.perfil.administrador), planoController.buscarPlanos);
servidor.app.get('/plano/:id', planoController.buscarPlanoPorId);
servidor.app.patch('/plano/:id', autorizacao.autorizar(model.perfil.administrador), planoController.alterarPlano);
servidor.app.post('/assinante', assinanteController.cadastrarAssinante);
servidor.app.get('/assinante', assinanteController.buscarAssinantes);
servidor.app.patch('/assinante/:id', autorizacao.autorizar(model.perfil.administrador), assinanteController.alterarStatusDoAssinante);
servidor.app.post('/mensagem', mensagemController.enviarMensagem);
servidor.app.get('/mensagem', mensagemController.buscarMensagensPorFiltro);
servidor.app.get('/mensagem/:idMensagem', mensagemController.buscarMensagemPorId);
servidor.app.patch('/mensagem/:idMensagem', mensagemController.excluirMensagem);
servidor.app.post('/mensagem/:idMensagem', mensagemController.responderMensagem);

