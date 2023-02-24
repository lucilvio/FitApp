// const Usuario = require('./model/usuario');
// const Plano = require('./model/plano');
// const Nutricionista = require('./model/nutricionista');
// const Personal = require('./model/personalTrainer');
// const Assinante = require('./model/assinante');

// const usuarioAdmin = new Usuario.Usuario('Administrador', 'admin@fitapp.com', 'administrador');
// usuarioAdmin.idUsuario = "e7c17d74-f067-46ca-9734-1c232ba0ea18";
// usuarioAdmin.senha = 'admin123';

// const planoGratuitoTeste = new Plano.Plano('Gratuito', 0, 15, 'Experimente por 15 dias');
// planoGratuitoTeste.idPlano = "idPlano";

// const planoMensalTeste = new Plano.Plano('Mensal', 100, 30, 'Experimente por 30 dias');
// planoMensalTeste.idPlano = "idMensal";

// const planoAnualTeste = new Plano.Plano('Trimestral', 250, 90, 'Experimente por 90 dias');
// planoAnualTeste.idPlano = "idAnual";

// const nutriTeste = new Nutricionista.Nutricionista('Nutricionista', 'nutri@fitapp.com', '999999999', 'CRN 123');
// nutriTeste.idNutri = "idNutri";
// nutriTeste.usuario.idUsuario = "idNutri";
// nutriTeste.usuario.senha = "nutri123";

// const personalTeste = new Personal.PersonalTrainer('Personal', 'personal@fitapp.com', '999999999', 'CRN 123');
// personalTeste.idPersonal = "idPersonal";
// personalTeste.usuario.idUsuario = "idPersonal";
// personalTeste.usuario.senha = "personal123";

// const assinanteTeste = new Assinante.Assinante('Assinante', 'assinante@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
// assinanteTeste.idAssinante = "idAssinante"
// assinanteTeste.usuario.idUsuario = "idAssinante";
// assinanteTeste.usuario.senha = "assinante123";
// assinanteTeste.assinatura.idAssinatura = "idAssinatura";
// assinanteTeste.assinatura.idAssinante = "idAssinante";

// const assinanteBloqueadoTeste = new Assinante.Assinante('AssinanteBloqueado', 'assinantebloqueado@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
// assinanteBloqueadoTeste.idAssinante = "idAssinanteBloqueado"
// assinanteBloqueadoTeste.usuario.idUsuario = "idAssinanteBloqueado";
// assinanteBloqueadoTeste.usuario.bloqueado = true;
// assinanteBloqueadoTeste.usuario.senha = "assinante123";
// assinanteBloqueadoTeste.assinatura.idAssinatura = "idAssinaturaBloqueada";
// assinanteBloqueadoTeste.assinatura.idAssinante = "idAssinanteBloqueado";

// const assinanteAssinaturaTeste = new Assinante.Assinante('AssinanteAssinaturaTeste', 'assinanteassinaturateste@fitapp.com', planoGratuitoTeste, 'idNutri', 'idPersonal');
// assinanteAssinaturaTeste.idAssinante = "idAssinanteAssinaturaTeste"
// assinanteAssinaturaTeste.usuario.idUsuario = "idAssinanteAssinaturaTeste";
// assinanteAssinaturaTeste.usuario.senha = "assinante123";
// assinanteAssinaturaTeste.assinatura.idAssinatura = "idAssinaturaTeste";
// assinanteAssinaturaTeste.assinatura.idAssinante = "idAssinanteAssinaturaTeste";



// const dados = {
//     usuarios: [
//         usuarioAdmin,
//         nutriTeste.usuario,
//         personalTeste.usuario,
//         assinanteTeste.usuario,
//         assinanteBloqueadoTeste.usuario,
//         assinanteAssinaturaTeste.usuario
//     ],

//     planos: [
//         planoGratuitoTeste,
//         planoMensalTeste,
//         planoAnualTeste
//     ],

//     nutricionistas: [
//         nutriTeste,               
//     ],

//     personalTrainers: [
//         personalTeste,       
//     ],

//     assinantes: [
//        assinanteTeste,
//        assinanteBloqueadoTeste,
//        assinanteAssinaturaTeste
//     ],

//     mensagens: []

// }

// module.exports = {
//     dados: dados
// }
