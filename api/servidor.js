//importa o modulo express (biblioteca para contrução de api)
const express = require('express');

//cria uma aplicação express (objeto)
const app = express();

//cria o frontend do swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const port = process.env.PORT || 3000;

//inicia o servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

//middlewares
app.use(express.json());

// app.use((req, res, next) => {

//     if (req.url == "/login") {
//         next();
//         return;
//     }
    
//     if (!req.body.chave) {
//         res.status(401).send("Não autorizado");
//         return;
//     }

//     next();
// });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports.app = app;