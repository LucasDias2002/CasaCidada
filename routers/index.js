const usuarioRota = require("./usuario");
const imovelRota = require("./imovel");

module.exports = (app) => {
    app.use("/usuarios", usuarioRota);
    app.use("/imovel", imovelRota);
};