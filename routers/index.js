const usuarioRota = require("./usuario");

module.exports = (app) => {
    app.use("/usuarios", usuarioRota);
};