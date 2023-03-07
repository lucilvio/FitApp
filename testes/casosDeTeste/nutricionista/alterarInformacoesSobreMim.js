const { spec } = require('pactum');
const configuracoes = require('../../configuracoes');
const usuario = require('../../funcoes/usuario');
const crypto = require('crypto');

it('CU-N 04 - O Nutricionista deve alterar as informacoes Sobre Mim', async () => {
    const tokenNutri = await usuario.gerarToken('nutri_teste@fitapp.com', 'nutri123');

    const textoSobreMim = `Informações sobre a Nutri_${crypto.randomUUID()}`;
    
    await spec()
        .patch(`${configuracoes.urlDaApi}/nutricionista/sobreMim`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .withJson({
            "texto": textoSobreMim,
            
        })
        .expectStatus(200);

        await spec()
        .get(`${configuracoes.urlDaApi}/nutricionista/perfil`)
        .withHeaders("Authorization", "Bearer " + tokenNutri)
        .expectJsonLike(
            {
                sobreMim:  textoSobreMim
            }
        )
        .expectStatus(200);
        
})