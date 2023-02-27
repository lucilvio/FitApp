const { spec } = require('pactum');
const crypto = require('crypto');
const nutricionista = require('../../funcoes/nutricionista');
const usuario = require('../../funcoes/usuario');

it('Deve enviar Mensagem', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const emailNutri = `nutri_teste_${crypto.randomUUID()}@fitapp.com`;
    const idNutri = await nutricionista.cadastrarNutri(token, `nutri_teste_${crypto.randomUUID()}`, emailNutri, "99999999", "crn000");

    await spec()
        .post('http://localhost:3000/mensagem')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "destinatario": emailNutri,
            "assunto": "Boas Vindas",
            "texto": "Olá, Estamos felizes por tê-lo conosco!",
        })
        .expectStatus(200);
});

it('Não envia Mensagem quando o Destinatario não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    await spec()
        .post('http://localhost:3000/mensagem')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "destinatario": "nutricionista@fitApp.com",
            "assunto": "Boas Vindas",
            "texto": "Olá, Estamos felizes por tê-lo conosco!",
        })
        .expectJson({ erro: "Destinatario não encontrado" })
        .expectStatus(404);
});