const servidor = require('./servidor');

const loginController = require('./controllers/loginController');
const nutricionistaController = require('./controllers/nutricionistaController');
const personalController = require('./controllers/personalController');


servidor.app.post('/login', loginController.login);
servidor.app.post('/nutricionista', nutricionistaController.cadastrarNutricionista);
servidor.app.get('/nutricionista', nutricionistaController.buscarNutricionistas);
servidor.app.post('/personal', personalController.cadastrarPersonal);
servidor.app.get('/personal', personalController.buscarPersonal);