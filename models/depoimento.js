const conexao = require("../database/conexaoPostgre");

const ImovelModel = {
    Listar: async () => {
        const sql = "SELECT * FROM DEPOIMENTOS;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar depoimentos Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando depoimentos Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM DEPOIMENTOS WHERE id= ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta[0]);
                console.log("Listando depoimentos por id!");
            })
        })
    },
    Inserir: async (dep) => {
        const sql = "INSERT INTO DEPOIMENTOS (nome, depoimento) VALUES (?,?)";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [dep.nome, dep.depoimento], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir depoimentos Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Inserindo depoimentos Model " + resposta.InsertId);
            })
        })
    },
    Update: async (id, dep) => {
        const sql = "UPDATE DEPOIMENTOS SET nome=?, depoimento=? WHERE id=?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [dep.nome, dep.depoimento,  id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Atualizar depoimentos Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Atualizando depoimentos Model: ${id}`);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM DEPOIMENTOS WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar depoimentos Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando depoimentos Model: ${id}`);
            })
        })
    }
}

module.exports = ImovelModel;