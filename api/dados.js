const crypto = require('crypto');

const dados = {
    usuarios: [
        {
            idUsuario: "e7c17d74-f067-46ca-9734-1c232ba0ea18",
            nome: 'Administrador',
            login: 'admin@fitapp.com',
            senha: 'admin123',
            bloqueado: false,
            perfil: 'administrador'
        },
        {
            idUsuario: 'idUsuarioNutri',
            nome: 'Nutricionista',
            login: 'nutri@fitapp.com',
            senha: 'nutri123',
            bloqueado: false,
            perfil: 'nutricionista',
            imagem: ''
        },
        {
            idUsuario: "idUsuarioPersonal",
            nome: 'Personal',
            login: 'personal@fitapp.com',
            senha: 'personal123',
            bloqueado: false,
            perfil: 'personal',
            imagem: ''
        },
        {
            idusuario: 'idUsuarioAssinante',
            nome: 'Gui',
            login: 'gui_111@fitapp.com',
            senha: 'assinante123',
            bloqueado: false,
            perfil: 'assinante'
        }
    ],

    planos: [
        {
            idPlano: 'idPlano',
            nome: 'Plano Gratuito',
            valor: 0,
            bloqueado: false,
            descricao: 'Informações sobre o Plano'
        }
    ],

    nutricionistas: [
        {
            idNutri: 'idNutri',
            usuario: {
                idUsuario: 'idUsuarioNutri',
                nome: 'Nutricionista',
                login: 'nutri@fitapp.com',
                senha: 'nutri123',
                bloqueado: false,
                perfil: 'nutricionista',
                imagem: ''
            },
            nome: 'Nutricionista',
            email: 'nutri@fitapp.com',
            telefone: '999999999',
            registroProfissional: 'CRN 123',
            sobreMim: ''
        },
    ],

    personalTrainers: [
        {
            idPersonal: 'idPersonal',
            usuario: {
                idUsuario: "idUsuarioPersonal",
                nome: 'Personal',
                login: 'personal@fitapp.com',
                senha: 'personal123',
                bloqueado: false,
                perfil: 'personal',
                imagem: ''
            },
            nome: 'Personal',
            email: 'personal@fitapp.com',
            telefone: '999999999',
            registroProfissional: 'CRP 123',
            sobreMim: ''
        }
    ],

    assinantes: [
        {
            idAssinante: 'idAssinante',
            usuario: {
                idusuario: 'idUsuarioAssinante',
                nome: 'Gui',
                login: 'gui_111@fitapp.com',
                senha: 'assinante123',
                bloqueado: false,
                perfil: 'assinante'
            },
            nome: 'Gui',
            email: 'gui_111@fitapp.com',
            assinatura: {
                idAssinatura: 'idAssinatura',
                idPlano: 'idPlano',
            },
            nutricionista: 'idNutri',
            personal: 'idPersonal',
            dietas: [],
            treinos: []
        }
    ],

    mensagens: []

}

module.exports = {
    dados: dados
}
