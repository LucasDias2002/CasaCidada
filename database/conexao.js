const mysql = require("mysql");

const conexao = mysql.createConnection({
    host: "srvcasacidada.mysql.database.azure.com",
    port: 3306,
    user: "Casacidada",
    password: "Admincs2024",
    database: "casacidada",
    ssl: {
      rejectUnauthorized: false
    }
});

conexao.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados MySQL');
  });

module.exports = conexao;