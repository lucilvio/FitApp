const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');

it('CU-N 05 - deve listar os Pacientes', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/pacientes`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike([{
            "idAssinante": "idAssinante_teste"
        }])
        .expectStatus(200);

    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/pacientes/?nome=assinante_teste`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike([{
            "idAssinante": "idAssinante_teste",
            "nome": "assinante_teste"
        }])
        .expectStatus(200);

});

it('CU-N 05 - não deve listar os Pacientes para Personal', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/pacientes`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectStatus(401);

});