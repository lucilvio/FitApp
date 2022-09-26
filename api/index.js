const servidor = require('./servidor');
const loginController = require('./controllers/loginController');
const usuariosController = require('./controllers/usuariosController');
const nutricionistasController = require('./controllers/nutricionistasController');
const personalTrainersController = require('./controllers/personalTrainersController');
const planosController = require('./controllers/planosController');
const assinantesController = require('./controllers/assinantesController');
const mensagensController = require('./controllers/mensagensController');
const autorizacao = require('./seguranca/autorizacao');
const model = require('./model/perfis');



//Geral
servidor.app.post('/login', loginController.login);
servidor.app.patch('/usuario', usuariosController.redefinirSenha);
servidor.app.post('/assinante', assinantesController.cadastrarAssinante);
servidor.app.get('/nutricionistas/:id', nutricionistasController.buscarNutriPorId);
servidor.app.get('/personalTrainers/:id', personalTrainersController.buscarPersonalPorId);
servidor.app.get('/planos/:id', planosController.buscarPlanoPorId);
servidor.app.post('/mensagem', mensagensController.enviarMensagem);
servidor.app.get('/mensagem', mensagensController.buscarMensagensPorFiltro);
servidor.app.get('/mensagens/:idMensagem', mensagensController.buscarMensagemPorId);
servidor.app.patch('/mensagens/:idMensagem', mensagensController.excluirMensagem);
servidor.app.post('/mensagens/:idMensagem', mensagensController.responderMensagem);


//Administrador
servidor.app.post('/admin/nutricionista', autorizacao.autorizar(model.perfil.administrador), nutricionistasController.cadastrarNutricionista);
servidor.app.get('/admin/nutricionista', autorizacao.autorizar(model.perfil.administrador), nutricionistasController.buscarNutricionistas);
servidor.app.patch('/admin/nutricionista/:id', autorizacao.autorizar(model.perfil.administrador), nutricionistasController.alterarDadosDoNutricionista);

servidor.app.post('/admin/personal', autorizacao.autorizar(model.perfil.administrador), personalTrainersController.cadastrarPersonal);
servidor.app.get('/admin/personal', autorizacao.autorizar(model.perfil.administrador), personalTrainersController.buscarPersonal);
servidor.app.patch('/admin/personal/:id', autorizacao.autorizar(model.perfil.administrador), personalTrainersController.alterarDadosDoPersonal);

servidor.app.post('/admin/plano', autorizacao.autorizar(model.perfil.administrador), planosController.cadastrarPlano);
servidor.app.get('/admin/plano', autorizacao.autorizar(model.perfil.administrador), planosController.buscarPlanos);
servidor.app.patch('/admin/plano/:id', autorizacao.autorizar(model.perfil.administrador), planosController.alterarDadosDoPlano);

servidor.app.get('/admin/assinante', autorizacao.autorizar(model.perfil.administrador), assinantesController.buscarAssinantes);
servidor.app.patch('/admin/assinante/:id', autorizacao.autorizar(model.perfil.administrador), assinantesController.alterarStatusDoAssinante);


//Nutricionista
servidor.app.patch('/nutricionista/perfil', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarDadosDoPerfil);
servidor.app.patch('/nutricionista/senha', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarSenha);
servidor.app.patch('/nutricionista/sobreMim', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.alterarInformacoesSobreMim);
servidor.app.get('/nutricionista/pacientes', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarPacientes);
servidor.app.get('/nutricionista/pacientes/:idAssinante', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarPacientePorId);
servidor.app.post('/nutricionista/pacientes/:idAssinante/dietas', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.criarDieta);
servidor.app.get('/nutricionista/pacientes/:idAssinante/dietas/:idDieta', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.buscarDietaPorId);
servidor.app.patch('/nutricionista/pacientes/:idAssinante/dietas/:idDieta', autorizacao.autorizar(model.perfil.nutricionista), nutricionistasController.editarDieta);

//Personal Trainer
servidor.app.patch('/personal/perfil', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarDadosDoPerfil);
servidor.app.patch('/personal/senha', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarSenha);
servidor.app.patch('/personal/sobreMim', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.alterarInformacoesSobreMim);
servidor.app.get('/personal/alunos', autorizacao.autorizar(model.perfil.personalTrainer), personalTrainersController.buscarAlunos);





//Assinante




