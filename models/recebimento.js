const conexao = require("../database/conexao");

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