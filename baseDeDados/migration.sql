CREATE DATABASE  IF NOT EXISTS `db_fitapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `db_fitapp`;

CREATE USER IF NOT EXISTS 'fitapp_user'@'localhost' IDENTIFIED BY '4542';
GRANT ALL PRIVILEGES ON `db_fitapp`.* TO 'fitapp_user'@'localhost';
FLUSH PRIVILEGES; 

CREATE TABLE  IF NOT EXISTS `usuarios` (
  `id_usuario` varchar(36) NOT NULL, 
  `perfil` varchar(32) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `login` varchar(128) NOT NULL,
  `senha` varchar(64) NOT NULL,
  `bloqueado` tinyint NOT NULL,
  `imagem` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `login_usuario_UNIQUE` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE  IF NOT EXISTS `nutricionistas` (
  `id_nutricionista` varchar(36) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `telefone` varchar(32) NOT NULL,
  `registro_profissional` varchar(30) NOT NULL,
  `sobre_mim` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id_nutricionista`),
  CONSTRAINT `fk_nutricionista_idUsuario` FOREIGN KEY (`id_nutricionista`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE  IF NOT EXISTS `personal_trainers` (
  `id_personal` varchar(36) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `telefone` varchar(32) NOT NULL,
  `registro_profissional` varchar(30) NOT NULL,
  `sobre_mim` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id_personal`),
  CONSTRAINT `fk_personal_idUsuario` FOREIGN KEY (`id_personal`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE  IF NOT EXISTS `sexos` (
  `id_sexo` int NOT NULL,
  `descricao` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id_sexo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE  IF NOT EXISTS `assinantes` (
  `id_assinante` varchar(36) NOT NULL,
  `id_nutricionista` varchar(36) NOT NULL,
  `id_personal` varchar(36) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `data_nascimento` datetime DEFAULT NULL,
  `id_sexo` int DEFAULT NULL,
  `altura` int DEFAULT NULL,
  `objetivos` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id_assinante`),
  KEY `fk_assinante_idNutricionista_idx` (`id_nutricionista`),
  KEY `fk_assinante_idPersonal_idx` (`id_personal`),
  KEY `fk_assinante_idSexo_idx` (`id_sexo`),
  CONSTRAINT `fk_assinante_idNutricionista` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionistas` (`id_nutricionista`),
  CONSTRAINT `fk_assinante_idPersonal` FOREIGN KEY (`id_personal`) REFERENCES `personal_trainers` (`id_personal`),
  CONSTRAINT `fk_assinante_idSexo` FOREIGN KEY (`id_sexo`) REFERENCES `sexos` (`id_sexo`),
  CONSTRAINT `fk_assinante_idUsuario` FOREIGN KEY (`id_assinante`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE  IF NOT EXISTS `medidas` (
  `id_medidas` varchar(36) NOT NULL,
  `id_assinante` varchar(36) NOT NULL,
  `peso` int DEFAULT NULL,
  `pescoco` int DEFAULT NULL,
  `cintura` int DEFAULT NULL,
  `quadril` int DEFAULT NULL,
  PRIMARY KEY (`id_medidas`),
  KEY `fk_medidas_idAssinante_idx` (`id_assinante`),
  CONSTRAINT `fk_medidas_idAssinante` FOREIGN KEY (`id_assinante`) REFERENCES `assinantes` (`id_assinante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE  IF NOT EXISTS `planos` (
  `id_plano` varchar(36) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `valor` decimal(5,2) NOT NULL,
  `duracao` int NOT NULL,
  `descricao` varchar(256) NOT NULL,
  `bloqueado` tinyint NOT NULL,
  PRIMARY KEY (`id_plano`),
  UNIQUE KEY `nome_plano_UNIQUE` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE  IF NOT EXISTS `assinaturas` (
  `id_assinatura` varchar(36) NOT NULL,
  `id_assinante` varchar(36) NOT NULL,
  `id_plano` varchar(36) NOT NULL,
  `data_inicio` datetime NOT NULL,
  `data_fim` datetime NOT NULL,
  `bloqueado` tinyint NOT NULL,
  PRIMARY KEY (`id_assinatura`),
  KEY `fk_idAssinante_idx` (`id_assinante`),
  KEY `fk_assinatura_idPlano_idx` (`id_plano`),
  CONSTRAINT `fk_assinatura_idAssinante` FOREIGN KEY (`id_assinante`) REFERENCES `assinantes` (`id_assinante`),
  CONSTRAINT `fk_assinatura_idPlano` FOREIGN KEY (`id_plano`) REFERENCES `planos` (`id_plano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

replace into sexos (id_sexo, descricao) values(1, 'feminino');
replace into sexos (id_sexo, descricao) values(2, 'masculino');

replace into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'e7c17d74-f067-46ca-9734-1c232ba0ea18',
'administrador',
'administrador',
'admin@fitapp.com',
'admin123',
false
);

replace into planos (id_plano, nome, valor, duracao, descricao, bloqueado)
values(
'57408fdd-8ccc-441a-953f-555dec2005bc',
'gratuito',
0,
365,
'experimente por 15 dias.',
false
);

replace into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'cdb6531c-0bc4-48b2-b317-dece78f5349e',
'nutricionista',
'nutricionista',
'nutri@fitapp.com',
'nutri123',
false
);

replace into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'355049aa-1742-45d2-934d-278db5a6c224',
'personal',
'personal',
'personal@fitapp.com',
'personal123',
false
);

replace into nutricionistas (id_nutricionista, nome, email, telefone, registro_profissional)
values (
'cdb6531c-0bc4-48b2-b317-dece78f5349e',
'nutricionista',
'nutri@fitapp.com',
999999999,
'crn123'
);

replace into personal_trainers (id_personal, nome, email, telefone, registro_profissional)
values (
'355049aa-1742-45d2-934d-278db5a6c224',
'personal',
'personal@fitapp.com',
999999999,
'cre123'
);

