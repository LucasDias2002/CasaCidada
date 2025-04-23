// const {Pool} = require('pg');
// const connectionString = 'postgresql://neondb_owner:npg_Pty1BCniO6xg@ep-aged-silence-a89sobzk-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

// const pool = new Pool({
//     connectionString : connectionString,
//     port: 5432,
// });
// module.exports = pool;
// async function connect() {
//     try {
//         const client = await pool.connect();
//         client.release();
//         console.log("Conectado com sucesso");
//     }catch(error) {
//         console.error("Erro ao conectar ao banco de dados", error);
//         throw error;
//     }
// };

// async function disconnect() {
//     try {
//         console.log("Tentando desconectar");
//         const client = await pool.end();
//         console.log("Desconectado");
//     }catch(error) {
//         console.error("Erro ao desconectar do banco de dados", error);
//         throw error;
//     }
// }
// connect();

const { Sequelize } = require('sequelize');

// Defina as credenciais do banco de dados
const sequelize = new Sequelize('postgresql://neondb_owner:npg_Pty1BCniO6xg@ep-aged-silence-a89sobzk-pooler.eastus2.azure.neon.tech/neondb?sslmode=require', {
    dialect: 'postgres',
    logging: false, // Deixe como true para ver as consultas SQL no console
    ssl: {
        require: true, // Habilita o SSL
        rejectUnauthorized: false // Para permitir conexões com SSL em bancos que não possuem certificados verificados
    }
});

// Função para testar a conexão
async function connect() {
    try {
        await sequelize.authenticate(); // Teste a conexão
        console.log("Conectado com sucesso ao PostgreSQL via Sequelize!");
    } catch (error) {
        console.error("Erro ao conectar com o PostgreSQL via Sequelize:", error);
        throw error;
    }
}

// Função para desconectar
async function disconnect() {
    try {
        await sequelize.close(); // Fecha a conexão
        console.log("Desconectado do banco de dados");
    } catch (error) {
        console.error("Erro ao desconectar do banco de dados", error);
        throw error;
    }
}

// Chama a função de conexão para testar
connect();

module.exports = { sequelize, connect, disconnect };
