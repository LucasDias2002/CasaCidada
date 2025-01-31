const {Pool} = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_Pty1BCniO6xg@ep-aged-silence-a89sobzk-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

const pool = new Pool({
    connectionString : connectionString,
    port: 5432,
});
module.exports = pool;
async function connect() {
    try {
        const client = await pool.connect();
        client.release();
        console.log("Conectado com sucesso");
    }catch(error) {
        console.error("Erro ao conectar ao banco de dados", error);
        throw error;
    }
};

async function disconnect() {
    try {
        console.log("Tentando desconectar");
        const client = await pool.end();
        console.log("Desconectado");
    }catch(error) {
        console.error("Erro ao desconectar do banco de dados", error);
        throw error;
    }
}
connect();