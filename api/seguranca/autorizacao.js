function autorizar(perfil) {
    return function (req, res, next) {
        if (req.usuario.perfil == perfil) {
            next();
        } else {
            res.status(401).send({erro: "Não autorizado"});
        }
    }
}

module.exports = {
    autorizar: autorizar
}