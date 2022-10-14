const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const plano = require('../../funcoes/plano');
const crypto = require('crypto');

it('CU-A 17 - deve ver os dados do Plano', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const nomePlano = `Gratuito_${crypto.randomUUID()}`;
    const idPlano = await plano.cadastrarPlano(token, nomePlano, 0, 15, "Experimente gratis por 15 dias");

    await spec()
        .get(`http://localhost:3000/admin/planos/${idPlano}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJsonLike(
            {
                idPlano: idPlano,
                nome: nomePlano
            }
        )
        .expectStatus(200);
});

it('CU-A 17 - não encontra plano quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const nomePlano = `Gratuito_${crypto.randomUUID()}`;
    const idPlano = await plano.cadastrarPlano(token, nomePlano, 0, 15, "Experimente gratis por 15 dias");

    await spec()
        .get(`http://localhost:3000/admin/planos/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJson({ erro: "Plano não encontrado" })
        .expectStatus(404);
});