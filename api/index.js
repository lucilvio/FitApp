const servidor = require('./servidor');

const loginController = require('./controllers/loginController');
const nutricionistaController = require('./controllers/nutricionistaController');
const personalController = require('./controllers/personalController');
const planoController = require('./controllers/planoController');
const assinanteController = require('./controllers/assinanteController');


servidor.app.post('/login', loginController.login);
servidor.app.post('/nutricionista', nutricionistaController.cadastrarNutricionista);
servidor.app.get('/nutricionista', nutricionistaController.buscarNutricionistas);
servidor.app.get('/nutricionista/:id', nutricionistaController.buscarNutriPorId);-
servidor.app.patch('/nutricionista/:id', nutricionistaController.alterarDadosDoNutricionista);
servidor.app.post('/personal', personalController.cadastrarPersonal);
servidor.app.get('/personal', personalController.buscarPersonal);
servidor.app.patch('/personal/:id', personalController.alterarStatusPersonal);
servidor.app.post('/plano', planoController.cadastrarPlano);
servidor.app.get('/plano', planoController.buscarPlanos);
servidor.app.get('/plano/:id', planoController.buscarPlanoPorId);
servidor.app.patch('/plano/:id', planoController.alterarPlano);
servidor.app.post('/assinante', assinanteController.cadastrarAssinante);