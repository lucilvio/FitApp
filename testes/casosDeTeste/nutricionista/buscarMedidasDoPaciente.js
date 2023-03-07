const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const assinante = require('../../funcoes/assinante');

it('CU-N 11 - deve listar o historico de medidas do Paciente', async () => {
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    const idMedidas = await assinante.inserirMedidas(tokenAssinante, 90, 30, 71, 95);

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/pacientes/idAssinante_teste/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                historicoDeMedidas: [
                    {
                        idMedidas: idMedidas
                    }
                    
                ]
            }
        )
        .expectStatus(200);

});

it('CU-N 11 - não encontra historico de medidas quando o id do paciente não existe', async () => {

    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/pacientes/id_incorreto/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJson({ erro: "Paciente não encontrado" })
        .expectStatus(404);

});