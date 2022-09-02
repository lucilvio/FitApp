const crypto = require('crypto');

const dados = {
    usuarios: [
        {
            id: "894b6009-3c5c-4c6e-8c37-0e48cc631d6f",
            nome: 'Administrador',
            login: 'admin@fitapp.com',
            senha: 'admin123',
            bloqueado: false,
            perfil: 'administrador',
            mensagens: []
        }
    ],

    planos: [],

    nutricionistas: [],

    personalTrainers: [],

    assinantes: [],

    mensagens: []
        
}

module.exports = {
    dados: dados
}
