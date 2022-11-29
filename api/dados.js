const Usuario = require('./model/usuario');
const Plano = require('./model/plano');
const Nutricionista = require('./model/nutricionista');
const Personal = require('./model/personalTrainer');
const Assinante = require('./model/assinante');
const Medidas = require('./model/medidas');

const usuarioAdmin = new Usuario('Administrador', 'admin@fitapp.com', 'administrador');
usuarioAdmin.idUsuario = "e7c17d74-f067-46ca-9734-1c232ba0ea18";
usuarioAdmin.senha = 'admin123';

const planoGratuitoTeste = new Plano('Gratuito', 0, 15, 'Experimente por 15 dias');
planoGratuitoTeste.idPlano = "idPlano";

const planoMensalTeste = new Plano('Mensal', 100, 30, 'Experimente por 30 dias');
planoMensalTeste.idPlano = "idMensal";

const planoAnualTeste = new Plano('Trimestral', 250, 90, 'Experimente por 90 dias');
planoAnualTeste.idPlano = "idAnual";

const nutriTeste = new Nutricionista('Nutricionista', 'nutri@fitapp.com', '999999999', 'CRN 123');
nutriTeste.idNutri = "idNutri";
nutriTeste.usuario.idUsuario = "idNutri";
nutriTeste.usuario.senha = "nutri123";

const personalTeste = new Personal('Personal', 'personal@fitapp.com', '999999999', 'CRN 123');
personalTeste.idPersonal = "idPersonal";
personalTeste.usuario.idUsuario = "idPersonal";
personalTeste.usuario.senha = "personal123";

const assinanteTeste = new Assinante('Assinante', 'assinante@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
assinanteTeste.idAssinante = "idAssinante"
assinanteTeste.usuario.idUsuario = "idAssinante";
assinanteTeste.usuario.senha = "assinante123";
assinanteTeste.assinaturas[0].idAssinatura = "idAssinatura";
assinanteTeste.assinaturas[0].idAssinante = "idAssinante";

const medidasTeste = new Medidas(80, 30, 71, 95);
medidasTeste.idMedida = "idMedida";

const assinanteMedidasTeste = new Assinante('Assinante', 'assinantemedidas@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
assinanteMedidasTeste.idAssinante = "idAssinanteMedidas"
assinanteMedidasTeste.usuario.idUsuario = "idAssinanteMedidas";
assinanteMedidasTeste.usuario.senha = "assinante123";
assinanteMedidasTeste.assinaturas[0].idAssinatura = "idAssinaturaMedidas";
assinanteMedidasTeste.assinaturas[0].idAssinante = "idAssinanteMedidas";
assinanteMedidasTeste.medidas.push(medidasTeste);

const assinanteBloqueadoTeste = new Assinante('AssinanteBloqueado', 'assinantebloqueado@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
assinanteBloqueadoTeste.idAssinante = "idAssinanteBloqueado"
assinanteBloqueadoTeste.usuario.idUsuario = "idAssinanteBloqueado";
assinanteBloqueadoTeste.usuario.bloqueado = true;
assinanteBloqueadoTeste.usuario.senha = "assinante123";
assinanteBloqueadoTeste.assinaturas[0].idAssinatura = "idAssinaturaBloqueada";
assinanteBloqueadoTeste.assinaturas[0].idAssinante = "idAssinanteBloqueado";

const assinanteAssinaturaTeste = new Assinante('AssinanteAssinaturaTeste', 'assinanteassinaturateste@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
assinanteAssinaturaTeste.idAssinante = "idAssinanteAssinaturaTeste"
assinanteAssinaturaTeste.usuario.idUsuario = "idAssinanteAssinaturaTeste";
assinanteAssinaturaTeste.usuario.senha = "assinante123";
assinanteAssinaturaTeste.assinaturas[0].idAssinatura = "idAssinaturaTeste";
assinanteAssinaturaTeste.assinaturas[0].idAssinante = "idAssinanteAssinaturaTeste";



const dados = {
    usuarios: [
        usuarioAdmin,
        nutriTeste.usuario,
        personalTeste.usuario,
        assinanteTeste.usuario,
        assinanteMedidasTeste.usuario,
        assinanteBloqueadoTeste.usuario,
        assinanteAssinaturaTeste.usuario
    ],

    planos: [
        planoGratuitoTeste,
        planoMensalTeste,
        planoAnualTeste
    ],

    nutricionistas: [
        nutriTeste,               
    ],

    personalTrainers: [
        personalTeste,       
    ],

    assinantes: [
       assinanteTeste,
       assinanteMedidasTeste,
       assinanteBloqueadoTeste,
       assinanteAssinaturaTeste
    ],

    mensagens: []

}

module.exports = {
    dados: dados
}
