const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');
const crypto = require('crypto');

it('CU-A 19 - deve cadastrar Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    const nomePlano = `Gratuito_${crypto.randomUUID()}`;

    await spec()
        .post('http://localhost:3000/admin/planos')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nomePlano,
            "valor": 0,
            "duracao": 15,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/admin/planos`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike([
            {
                nome: nomePlano
            }
        ])
        .expectStatus(200);
});

it('CU-A 19 - Não deve cadastrar Plano com  mesmo nome', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    const nomePlano = `Gratuito_${crypto.randomUUID()}`;
    const idPlano = await plano.cadastrarPlano(token, nomePlano, 0, 15, "Experimente gratis por 15 dias");

    await spec()
        .post('http://localhost:3000/admin/planos')
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": nomePlano,
            "valor": 0,
            "duracao": 15,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectJson({ erro: "Esse plano já foi cadastrado" })
        .expectStatus(400);
})