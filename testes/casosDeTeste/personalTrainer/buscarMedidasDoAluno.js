const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 11 - deve listar o historico de medidas do aluno', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                medidas: []
            }
        )
        .expectStatus(200);



});

it('CU-P 11 - não encontra historico de medidas quando o id do aluno não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .get(`http://localhost:3000/personalTrainer/alunos/idAssinante123/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});