const conexao = require("../database/conexaoPostgre");
const { ListarUltimo2anos } = require("./gasto");

const RecebimentoModel = {
    Listar: async () => {
        const sql = "SELECT * FROM RECEBIMENTOS;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar RECEBIMENTOS Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando RECEBIMENTOS Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM RECEBIMENTOS WHERE id= ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta[0]);
                console.log("Listando RECEBIMENTOS por id!");
            })
        })
    },
    ListarUltimo2anos: async () => {
        const sql = `SELECT DATE_FORMAT(r.data_recebimento, '%m-%Y') AS mes, SUM(r.valor) AS total_recebimentos FROM recebimentos r WHERE YEAR(r.data_recebimento) >= YEAR(NOW()) - 2 GROUP BY DATE_FORMAT(r.data_recebimento, '%m-%Y');`;

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar RECEBIMENTOS dos ultimos 2 anos - Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando RECEBIMENTOS recebimento dos ultimos 2 anos - Model!')
            })
        })
    },
    Inserir: async (doacao) => {
        const sql = "INSERT INTO RECEBIMENTOS (valor, data_recebimento, sigla_doador) VALUES (?,?,?)";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [doacao.valor, doacao.data_recebimento, doacao.sigla], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir RECEBIMENTOS Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Inserindo RECEBIMENTOS Model " + resposta.InsertId);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM RECEBIMENTOS WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar RECEBIMENTOS Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando RECEBIMENTOS Model: ${id}`);
            })
        })
    }
}

module.exports = RecebimentoModel;