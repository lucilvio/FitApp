const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const assinante = require('../../funcoes/assinante');

it('CU-P 11 - deve listar o historico de medidas do aluno', async () => {
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');

    const idMedidas = await assinante.inserirMedidas(tokenAssinante, 90, 30, 71, 95);

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos/idAssinante_teste/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
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

it('CU-P 11 - não encontra historico de medidas quando o id do aluno não existe', async () => {

    const tokenPersonal = await usuario.gerarToken('personal_teste@fitapp.com', 'personal123');

    await spec()
        .get(`${configuracoes.urlDaApi}/personalTrainer/alunos/id_incorreto/medidas`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .expectJson({ erro: "Aluno não encontrado" })
        .expectStatus(404);

});