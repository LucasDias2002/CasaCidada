const express = require("express");
const rotas = require("../routers/usuario");
const app =  express();

app.use(express.json());

app.use('/usuarios', rotas); //

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000}`);
  });