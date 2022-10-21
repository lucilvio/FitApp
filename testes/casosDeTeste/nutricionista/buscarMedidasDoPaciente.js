const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 11 - deve listar o historico de medidas do Paciente', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                medidas: []
            }
        )
        .expectStatus(200);



});

it('CU-N 11 - não encontra historico de medidas quando o id do paciente não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante123/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});