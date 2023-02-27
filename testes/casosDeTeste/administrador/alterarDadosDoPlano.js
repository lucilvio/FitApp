const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');

const crypto = require('crypto');

it('CU-A 18 - deve alterar dados do Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `gratuito_${crypto.randomUUID()}`, 0, 15, "Experimente gratis por 15 dias");

    await spec()
        .get(`http://localhost:3000/admin/planos/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idPlano: idPlano,
            }
        )
        .expectStatus(200);

    const nomeNovoPlano =  `trimestral_${crypto.randomUUID()}`

        await spec()
            .patch(`http://localhost:3000/admin/planos/${idPlano}`)
            .withHeaders("Authorization", "Bearer " + token)
            .withJson({
                "nome": nomeNovoPlano,
                "valor": 0,
                "duracao": 90,
                "descricao": "Experimente gratis por 15 dias",
                "bloqueado": true,
            })
            .expectStatus(200);

    await spec()
        .get(`http://localhost:3000/admin/planos/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                nome: nomeNovoPlano
            }
        )
        .expectStatus(200);
});

it('CU-A 18 - Não altera dados do Plano quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    await spec()
        .patch(`http://localhost:3000/admin/planos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "nome": `gratuito_55`,
            "valor": 0,
            "duracao": 365,
            "descricao": "Experimente gratis por 15 dias",
            "bloqueado": true,
        })
        .expectJson({ erro: "Plano não encontrado" })
        .expectStatus(404);
});

// it('CU-A 18 - Não altera o nome do Plano quando já existe um plano cadastrado com mesmo nome', async () => {
//     const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

//     const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

//     await spec()
//         .patch(`http://localhost:3000/admin/planos/${idPlano}`)
//         .withHeaders("Authorization", "Bearer " + token)
//         .withJson({
//             "nome": `Gratuito`,
//             "valor": 0,
//             "bloqueado": true,
//             "descricao": "Experimente gratis por 15 dias"
//         })
//         .expectJson({ erro: "Já existe Plano com esse nome" })
//         .expectStatus(400);
// });