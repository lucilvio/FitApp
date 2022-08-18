const servidor = require('./servidor');

const loginController = require('./controllers/loginController');
const nutricionistaController = require('./controllers/nutricionistaController');

servidor.app.post('/login', loginController.login);
servidor.app.post('/nutricionista', nutricionistaController.cadastrarNutricionista);
servidor.app.get('/usuarios/:perfil', usuariosController.buscarUsuarios);