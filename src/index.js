const express = require("express");
const rotas = require("../routers/usuario");
const rotaImoveis = require("../routers/imovel");
const path = require("path");
const app =  express();

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use(express.json());

app.use('/usuarios', rotas);
app.use('/imoveis', rotaImoveis); //

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000}`);
  });