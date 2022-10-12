const { spec } = require('pactum');
const crypto = require('crypto');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');
const nutricionista = require('../../funcoes/nutricionista');
const personal = require('../../funcoes/personalTrainer');
const assinante = require('../../funcoes/assinante');

it('CU-A 04 - deve alterar status do Assinante', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    const idPersonal = await personal.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "55 555 55 55", "CRN 123");

    const idAssinante = await assinante.cadastrarAssinante("Guilherme", `gui_${crypto.randomUUID()}@fitapp.com`, idPlano, idNutri, idPersonal);

    await spec()
        .get(`http://localhost:3000/admin/assinantes/${idAssinante}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idAssinante: idAssinante,
            }
        )
        .expectStatus(200);

    await spec()
        .patch(`http://localhost:3000/admin/assinantes/${idAssinante}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "bloqueado": true,
        })
        .expectStatus(200);
});

it('CU-A 04 - Não altera o status do Assinante quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');

    const idPlano = await plano.cadastrarPlano(token, `Gratuito_${crypto.randomUUID()}`, 0, "Experimente gratis por 15 dias");

    const idNutri = await nutricionista.cadastrarNutri(token, "ana", `ana_${crypto.randomUUID()}@fitapp.com`, "99999999", "BFUDbHJKd");

    const idPersonal = await personal.cadastrarPersonal(token, "Bruno", `bruno_${crypto.randomUUID()}@fitapp.com`, "55 555 55 55", "CRN 123");

    const idAssinante = await assinante.cadastrarAssinante("Guilherme", `gui_${crypto.randomUUID()}@fitapp.com`, idPlano, idNutri, idPersonal);

    await spec()
        .patch(`http://localhost:3000/admin/assinantes/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .withJson({
            "bloqueado": true,
        })
        .expectJson({ erro: "Assinante não encontrado" })
        .expectStatus(404);
});