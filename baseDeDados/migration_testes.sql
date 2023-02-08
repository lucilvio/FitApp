insert into planos (id_plano, nome, valor, duracao, descricao, bloqueado)
values(
'idPlano',
'gratuito',
0,
15,
'experimente por 15 dias.',
false
);

insert into planos (id_plano, nome, valor, duracao, descricao, bloqueado)
values(
'idMensal',
'mensal',
100,
30,
'utilize por 30 dias.',
false
);

insert into planos (id_plano, nome, valor, duracao, descricao, bloqueado)
values(
'idAnual',
'anual',
250,
365,
'utilize por 365 dias.',
false
);

insert into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'idNutri',
'nutricionista',
'nutricionista',
'nutri@fitapp.com',
'nutri123',
false
);

insert into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'idPersonal',
'personal',
'personal',
'personal@fitapp.com',
'personal123',
false
);

insert into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'idAssinante',
'assinante',
'assinante',
'assinante@fitapp.com',
'assinante123',
false
);

insert into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'idAssinanteBloqueado',
'assinante',
'assinanteBloqueado',
'assinantebloqueado@fitapp.com',
'assinante123',
false
);

insert into usuarios (id_usuario, perfil, nome, login, senha, bloqueado)
values (
'idAssinanteAssinaturateste',
'assinante',
'assinanteAssinaturaTeste',
'assinanteassinaturateste@fitapp.com',
'assinante123',
false
);

insert into nutricionistas (id_nutricionista, nome, email, telefone, registro_profissional)
values (
'idNutri',
'nutricionista',
'nutri@fitapp.com',
999999999,
'crn123'
);

insert into personal_trainers (id_personal, nome, email, telefone, registro_profissional)
values (
'idPersonal',
'personal',
'personal@fitapp.com',
999999999,
'cre123'
);

insert into assinantes (id_assinante, id_nutricionista, id_personal, nome, email)
values (
'idAssinante',
'idNutri',
'idPersonal',
'assinante',
'assinante@fitapp.com'
);

insert into assinantes (id_assinante, id_nutricionista, id_personal, nome, email)
values (
'idAssinanteBloqueado',
'idNutri',
'idPersonal',
'assinanteBloqueado',
'assinantebloqueado@fitapp.com'
);
insert into assinantes (id_assinante, id_nutricionista, id_personal, nome, email)
values (
'idAssinanteAssinaturaTeste',
'idNutri',
'idPersonal',
'assinante',
'assinanteassinaturateste@fitapp.com'
);

insert into assinaturas (id_assinatura, id_assinante, id_plano, data_inicio, data_fim, bloqueado)
values (
'idAssinatura',
'idAssinante',
'idPlano',
now(),
date_add(now(),interval 15 day),
false
);

insert into assinaturas (id_assinatura, id_assinante, id_plano, data_inicio, data_fim, bloqueado)
values (
'idAssinaturaBloqueada',
'idAssinanteBloqueado',
'idPlano',
now(),
date_add(now(),interval 15 day),
true
);

insert into assinaturas (id_assinatura, id_assinante, id_plano, data_inicio, data_fim, bloqueado)
values (
'idAssinaturaTeste',
'idAssinanteAssinaturaTeste',
'idPlano',
now(),
date_add(now(),interval 15 day),
false
);
