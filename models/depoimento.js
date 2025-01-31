const conexao = require("../database/conexaoPostgre");

async function listar() {
    try {
        const result = await conexao.query('SELECT * FROM DEPOIMENTOS;')
        return result.rows;
    } catch (error) {
        console.error('Erro ao depoimentos - Model:', error);
        throw error;
    }
}

async function ListarPorId(id) {
    try {
        const result = await conexao.query('SELECT * FROM DEPOIMENTOS WHERE id= $1;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao listar depoimento por id - Model:', error);
        throw error;
    }
}

async function Inserir(dep) {
    try {
        const result = await conexao.query('INSERT INTO DEPOIMENTOS (nome, depoimento) VALUES ($1,$2)',[dep.nome, dep.depoimento]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir depoimento - Model:', error);
        throw error;
    }
}

async function Update(id, dep) {
    try {
        const result = await conexao.query("UPDATE DEPOIMENTOS SET nome=$1, depoimento=$2 WHERE id=$3 RETURNING *", [dep.nome, dep.depoimento,  id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Update usuário Model:', error);
        throw error;
    }
}

async function Delete(id) {
    try {
        const result = await conexao.query('DELETE FROM DEPOIMENTOS WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Deletar usuário Model:', error);
        throw error;
    }
}

module.exports = {
    listar,
    ListarPorId,
    Inserir,
    Update,
    Delete
}

/*
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
}*/
