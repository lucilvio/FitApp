const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');
it('CU-P 07 - deve listar os dados do Aluno', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                nome: 'Assinante'
            }
        )
        .expectStatus(200);



});

it('CU-P 07 - não encontra Aluno quando o id não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);



});