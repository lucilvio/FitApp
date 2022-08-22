const base = require('../dados.js');

function buscarUsuarioPorLogin(login) {
    return base.dados.usuarios.find(usuario => usuario.login == login);
    
}

module.exports = {
    buscarUsuarioPorLogin: buscarUsuarioPorLogin,    
  };