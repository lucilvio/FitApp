const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-P 05 - deve listar os alunos', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike([{
            "idAssinante": "idAssinante_teste"
        }])
        .expectStatus(200);

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJsonLike([{
            "idAssinante": "idAssinante_teste",
            "nome": "assinante_teste"
        }])
        .expectStatus(200);
});

it('CU-P 05 - não deve listar os alunos para o Nutricionista', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectStatus(401);



});




