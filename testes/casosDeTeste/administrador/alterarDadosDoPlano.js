const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');

const crypto = require('crypto');

it('CU-A 18 - deve alterar dados do Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    await spec()
        .get(`http://localhost:3000/admin/planos/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idPlano: idPlano,
            }
        )
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/admin/planos/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `Gratuito_55`,
            "valor": 0,
            "bloqueado": true,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectStatus(200);

        await spec()
        .get(`http://localhost:3000/admin/planos/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                nome:  `Gratuito_55`
            }
        )
        .expectStatus(200);
});

it('CU-A 18 - Não altera dados do Plano quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    await spec()
        .patch(`http://localhost:3000/admin/planos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `Gratuito_55`,
            "valor": 0,
            "bloqueado": true,
            "descricao": "Experimente gratis por 15 dias"
        })
        .expectJson({ erro: "Plano não encontrado" })
        .expectStatus(404);
});