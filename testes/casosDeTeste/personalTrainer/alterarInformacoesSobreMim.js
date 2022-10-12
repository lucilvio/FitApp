const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');

it('CU-P 04 - O Personal Trainer deve alterar as informacoes Sobre Mim', async () => {
    const tokenPersonal = await usuario.gerarToken('personal@fitapp.com', 'personal123');

    await spec()
        .patch(`http://localhost:3000/personalTrainer/sobreMim`)
        .withHeaders("Authorization", "Bearer " + tokenPersonal)
        .withJson({
            "texto": "Informações sobre o Perosnal Trainer",
            
        })
        .expectStatus(200);

        
})