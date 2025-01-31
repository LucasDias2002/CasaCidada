const conexao = require("../database/conexaoPostgre");

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

module.exports = GastosModel;