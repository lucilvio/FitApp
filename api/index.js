const servidor = require('./servidor');

const loginController = require('./controllers/loginController');
const nutricionistaController = require('./controllers/nutricionistaController');
const personalController = require('./controllers/personalController');


servidor.app.post('/login', loginController.login);
servidor.app.post('/nutricionista', nutricionistaController.cadastrarNutricionista);
servidor.app.get('/nutricionista', nutricionistaController.buscarNutricionistas);
servidor.app.patch('/nutricionista/:id', nutricionistaController.alterarDadosNutricionista);
servidor.app.post('/personal', personalController.cadastrarPersonal);
servidor.app.get('/personal', personalController.buscarPersonal);
servidor.app.patch('/personal/:id', personalController.alterarDadosPersonal);