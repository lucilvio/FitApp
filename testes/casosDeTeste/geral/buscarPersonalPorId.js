const { spec } = require('pactum');
const usuario = require('../../funcoes/usuario');
const personal = require('../../funcoes/personal');
const crypto = require('crypto');

it('CU-A 12 - deve ver os dados do personal', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const email = `bruno_${crypto.randomUUID()}@fitapp.com`;
    const idPersonal = await personal.cadastrarPersonal(token, "bruno", email, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/personal/${idPersonal}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJson(
            {
                idPersonal: idPersonal,
                nome: "bruno",
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

it('CU-A 12 - não encontra Personal quando o Id não existe', async () => {
    const token = await usuario.gerarToken('admin@fitapp.com', 'admin123');
    
    const email = `bruno_${crypto.randomUUID()}@fitapp.com`;
    const idPersonal = await personal.cadastrarPersonal(token, "bruno", email, "99999999", "BFUDbHJKd");

    await spec()
        .get(`http://localhost:3000/personal/${crypto.randomUUID()}`)
        .withHeaders("Authorization", "Bearer " + token)
        .expectJson({ erro: "Não encontrado" })
        .expectStatus(404);
});