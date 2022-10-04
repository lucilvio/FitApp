const jwt = require('jsonwebtoken');

function autenticar (req, res, next) {
    if (req.url == "/login") {
        next();
        return;
    }

    if(req.url == "/assinantes" && req.method == "POST") {
        next();
        return;
    }

    if(req.url == "/usuarios" && req.method == "PATCH") {
        next();
        return;
    }

    if(req.url == "/planos" && req.method == "GET") {
        next();
        return;
    }

    if(req.url == "/nutricionistas" && req.method == "GET") {
        next();
        return;
    }

    if(req.url == "/personalTrainers" && req.method == "GET") {
        next();
        return;
    }

    // if(req.url == "/nutricionistas/:idNutri" && req.method == "GET") {
    //     next();
    //     return;
    // }

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
}

module.exports = {
    autenticar: autenticar
}