const { spec, request } = require('pactum');
const fs = require('fs');
const usuario = require('../../funcoes/usuario');
const FormData = require('form-data-lite');
const configuracoes = require('../../configuracoes');


it('CU-G 08  - O usuário deve alterar a imagem do perfil', async () => {
    request.setDefaultTimeout(5000);
    
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');
    const form = new FormData();

    const imagem = fs.readFileSync(__dirname + '/teste.png');

    form.append('imagem', imagem, { filename: 'teste.png' });

    await spec()
        .post(`${configuracoes.urlDaApi}/usuarios/imagem`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withMultiPartFormData(form)
        .expectStatus(200);


})

it('CU-G 08  - O usuário não altera a imagem do perfil quando a extensao do arquivo não é valida', async () => {
    request.setDefaultTimeout(5000);
    
    const tokenAssinante = await usuario.gerarToken('assinante_teste@fitapp.com', 'assinante123');
    const form = new FormData();

    const imagem = fs.readFileSync(__dirname + '/teste_invalido.drawio');

    form.append('imagem', imagem, { filename: 'teste_invalido.drawio' });

    await spec()
        .post(`${configuracoes.urlDaApi}/usuarios/imagem`)
        .withHeaders("Authorization", "Bearer " + tokenAssinante)
        .withMultiPartFormData(form)
        .expectStatus(400);


})