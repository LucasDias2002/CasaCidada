const conexao = require("../database/conexaoPostgre");

async function Listar() {
    try {
        const result = await conexao.query('SELECT * FROM GASTOS;')
        return result.rows;
    } catch (error) {
        console.error('Erro ao gastos - Model:', error);
        throw error;
    }
}

async function ListarPorId(id) {
    try {
        const result = await conexao.query('SELECT * FROM GASTOS WHERE id= $1;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao listar gasto por id - Model:', error);
        throw error;
    }
}

async function ListarUltimo2anos() {
    try {
        const result = await conexao.query(`SELECT DATE_FORMAT(g.data_gasto, '%m-%Y') AS mes, SUM(g.valor) AS total_gastos FROM gastos g WHERE YEAR(g.data_gasto) >= YEAR(NOW()) - 2 GROUP BY DATE_FORMAT(g.data_gasto, '%m-%Y') ORDER BY mes;`);
        return result.rows;
    } catch (error) {
        console.error('Erro ao listar gasto por id - Model:', error);
        throw error;
    }
}

async function Inserir(gasto) {
    try {
        const result = await conexao.query("INSERT INTO GASTOS (valor, data_gasto, descricao) VALUES ($1,$2,$3)",  [gasto.valor, gasto.data_gasto, gasto.descricao]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir gastos - Model:', error);
        throw error;
    }
}

async function Delete(id) {
    try {
        const result = await conexao.query("DELETE FROM GASTOS WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Deletar gasto Model:', error);
        throw error;
    }
}

module.exports = {
    Listar,
    ListarPorId,
    ListarUltimo2anos,
    Inserir,
    Delete
}

/*
const GastosModel = {
    Listar: async () => {
        const sql = "SELECT * FROM GASTOS;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar GASTOS Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando GASTOS Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM GASTOS WHERE id= ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta[0]);
                console.log("Listando GASTOS por id!");
            })
        })
    },
    ListarUltimo2anos: async () => {
        const sql = `SELECT DATE_FORMAT(g.data_gasto, '%m-%Y') AS mes, SUM(g.valor) AS total_gastos FROM gastos g WHERE YEAR(g.data_gasto) >= YEAR(NOW()) - 2 GROUP BY DATE_FORMAT(g.data_gasto, '%m-%Y') ORDER BY mes;`;

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar gastos dos ultimos 2 anos - Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando gastos Model!')
            })
        })
    },
    Inserir: async (gasto) => {
        const sql = "INSERT INTO GASTOS (valor, data_gasto, descricao) VALUES (?,?,?)";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [gasto.valor, gasto.data_gasto, gasto.descricao], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir GASTOS Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Inserindo GASTOS Model " + resposta.InsertId);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM GASTOS WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar GASTOS Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando GASTOS Model: ${id}`);
            })
        })
    }
}

module.exports = GastosModel;*/