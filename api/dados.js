const crypto = require('crypto');

const dados = {
    usuarios: [
        {
            id: crypto.randomUUID(),
            nome: 'Administrador',
            login: 'admin@fitapp.com',
            senha: 'admin123',
            bloqueado: false,
            perfil: 'administrador',
            mensagens: []
        }
    ],

    personalTrainers: [],

    assinantes: []
        
}

module.exports = {
    dados: dados
}
