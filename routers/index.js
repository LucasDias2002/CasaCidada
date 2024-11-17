const usuarioRota = require("./usuario");
const imovelRota = require("./usuario");

module.exports = (app) => {
    app.use("/usuarios", usuarioRota);
    app.use("/imovel", imovelRota);
};