const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');


it('CU-P 07 - deve listar os dados do Aluno', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos/idAssinante_teste`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike(
            {
                "nome": 'assinante_teste'
            }
        )
        .expectStatus(200);
});

it('CU-P 07 - não encontra Aluno quando o id não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);
});