const express = require("express");
const cookieParser = require('cookie-parser');
const rotas = require("../routers/usuario");
const rotaImovel = require("../routers/imovel");
const rotaDepoimento = require("../routers/depoimento");
const rotaParceiro = require("../routers/parceiro");
const rotaNoticia = require("../routers/noticias");
const rotaAssistido = require('../routers/assistido')
const rotaRecebimento = require("../routers/recebimento");
const rotaGasto = require("../routers/gasto");
const authRouter = require("../routers/auth");
const protectedRouter = require("../routers/protected");
const fileupload = require('express-fileupload');
const path = require("path");
const app =  express();
app.use(fileupload());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
app.post('/logout', (req, res) => {
  res.clearCookie('userToken', { path: '/' });
  res.status(200).json({ message: 'Logout efetuado com sucesso!' });
  res.redirect('/login');
});
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'cadastro.html'));
});
app.get('/adm', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'adm.html'));
});
app.get('/quemsomos', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'quemsomos.html'));
});
app.get('/aluguelsolidario', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'aluguelsolidario.html'));
});
app.get('/parceiros', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'parceiros.html'));
});
app.get('/transparencia', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'transparencia.html'));
});
app.get('/assistidos', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'assistidos.html'));
});
app.get('/fotos', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'fotos.html'));
});
app.get('/poprua', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'poprua.html'));
});
app.get('/housingfirst', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'housingfirst.html'));
});
app.get('/doeagora', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'doeagora.html'));
});
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'contato.html'));
});

app.use('/usuarios', rotas);
app.use('/imovel', rotaImovel);
app.use('/depoimento', rotaDepoimento);
app.use('/recebimento', rotaRecebimento);
app.use('/gasto', rotaGasto);
app.use('/parceiro', rotaParceiro);
app.use('/noticia', rotaNoticia);
app.use('/assistido',rotaAssistido );
app.use('/auth', authRouter);
app.use(protectedRouter);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000}`);
  });