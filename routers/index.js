const usuarioRota = require("./usuario");
const imovelRota = require("./imovel");
const parceiroRota = require("./parceiro");

module.exports = (app) => {
    app.use("/usuarios", usuarioRota);
    app.use("/imovel", imovelRota);
    app.use("/parceiro", parceiroRota);
};