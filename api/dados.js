const Usuario = require('./model/usuario');
const Plano = require('./model/plano');
const Nutricionista = require('./model/nutricionista');
const Personal = require('./model/personalTrainer');
const Assinante = require('./model/assinante');

const usuarioAdmin = new Usuario('Administrador', 'admin@fitapp.com', 'administrador');
usuarioAdmin.idUsuario = "e7c17d74-f067-46ca-9734-1c232ba0ea18";
usuarioAdmin.senha = 'admin123';

const planoTeste = new Plano('Gratuito', 0,  'Experimente por 15 dias');
planoTeste.idPlano = "idPlano";


const nutriTeste = new Nutricionista('Nutricionista', 'nutri@fitapp.com', '999999999', 'CRN 123');
nutriTeste.idNutri = "idNutri";
nutriTeste.usuario.idUsuario = "idNutri";
nutriTeste.usuario.senha = "nutri123";

const personalTeste = new Personal('Personal', 'personal@fitapp.com', '999999999', 'CRN 123');
personalTeste.idPersonal = "idPersonal";
personalTeste.usuario.idUsuario = "idPersonal";
personalTeste.usuario.senha = "personal123";

const assinanteTeste = new Assinante('Assinante', 'assinante@fitapp.com', 'idPlano', 'idNutri', 'idPersonal');
assinanteTeste.idAssinante = "idAssinante"
assinanteTeste.usuario.idUsuario = "idAssinante";
assinanteTeste.usuario.senha = "assinante123";




const dados = {
    usuarios: [
        usuarioAdmin,
        nutriTeste.usuario,
        personalTeste.usuario,
        assinanteTeste.usuario
    ],

    planos: [
        planoTeste
    ],

    nutricionistas: [
        nutriTeste,               
    ],

    personalTrainers: [
        personalTeste,       
    ],

    assinantes: [
       assinanteTeste,
    ],

    mensagens: []

}

module.exports = {
    dados: dados
}
