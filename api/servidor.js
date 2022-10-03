//importa o modulo express (biblioteca para contrução de api)
const express = require('express');

//cria uma aplicação express (objeto)
const app = express();

//variavel de ambiente que guarda a porta
const port = process.env.PORT || 3000;

//inicia o servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = {
    app: app
}