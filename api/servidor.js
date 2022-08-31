//importa o modulo express (biblioteca para contrução de api)
const express = require('express');

//pacote npm que gera e valida token
const jwt = require('jsonwebtoken');

//cria o frontend do swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');



//cria uma aplicação express (objeto)
const app = express();

//variavel de ambiente que guarda a porta
const port = process.env.PORT || 3000;

//inicia o servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



//middlewares
app.use(express.json());

app.use((req, res, next) => {
    if (req.url == "/login") {
        next();
        return;
    }

    if(req.url == "/assinante" && req.method == "POST"){
        next();
        return;
    }

    if (!req.headers.authorization) {
        res.status(401).send("Não autorizado");
        return;
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const usuario = jwt.verify(token, 'shhhhh');
        req.usuario = usuario;
        next();
    }
    catch (erro) {
        res.status(401).send({ erro: "Erro na validação do Token." })
        return;
    }

    
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = {
    app: app
}