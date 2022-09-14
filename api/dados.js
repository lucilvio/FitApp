const crypto = require('crypto');

const dados = {
    usuarios: [
        {
            id: "e7c17d74-f067-46ca-9734-1c232ba0ea18",
            nome: 'Administrador',
            login: 'admin@fitapp.com',
            senha: 'admin123',
            bloqueado: false,
            perfil: 'administrador'
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
