const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-N 07 - deve listar os dados do Paciente', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/idAssinante_teste`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                "nome": 'assinante_teste'
            }
        )
        .expectStatus(200);



});

it('CU-N 07 - não encontra Paciente quando o id não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`http://localhost:3000/nutricionista/pacientes/id_incorreto`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);



});