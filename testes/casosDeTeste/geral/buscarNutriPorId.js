const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const nutricionista = require('../../funcoes/nutricionista');
const crypto = require('crypto');

it('CU-A 07 - deve ver os dados do Nutricionista', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const email = `ana_${crypto.randomUUID()}@fitapp.com`;
    const idNutri = await nutricionista.cadastrarNutri(token, "ana", email, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/nutricionista/${idNutri}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJson(
            {
                idNutri: idNutri,
                nome: "ana",
                email: email,
                telefone: "99999999",
                registro: "BFUDbHJKd",
                status: false,
                imagem: "",
                sobreMim: ""

            }
        )
        .expectStatus(200);
});

it('CU-A 07 - não encontra Nutricionista quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const email = `ana_${crypto.randomUUID()}@fitapp.com`;
    const idNutri = await nutricionista.cadastrarNutri(token, "ana", email, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/nutricionista/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJson({ erro: "Não encontrado" })
        .expectStatus(404);
});