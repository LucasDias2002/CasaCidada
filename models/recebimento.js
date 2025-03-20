const conexao = require("../database/conexaoPostgre");
//const { ListarUltimo2anos } = require("./gasto");

async function Listar() {
    try {
        const result = await conexao.query("SELECT * FROM RECEBIMENTOS ORDER BY data_recebimento DESC;")
        return result.rows;
    } catch (error) {
        console.error('Erro ao recebimentos - Model:', error);
        throw error;
    }
}

async function ListarPorId(id) {
    try {
        const result = await conexao.query("SELECT * FROM RECEBIMENTOS WHERE id= ?", [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao listar recebimento por id - Model:', error);
        throw error;
    }
}

async function ListarUltimo2anos() {
    try {
        const result = await conexao.query(`SELECT 
    TO_CHAR(r.data_recebimento, 'MM-YYYY') AS mes,
    SUM(r.valor) AS total_recebimentos
    FROM recebimentos r
    WHERE EXTRACT(YEAR FROM r.data_recebimento) >= EXTRACT(YEAR FROM CURRENT_DATE) - 2
    GROUP BY TO_CHAR(r.data_recebimento, 'MM-YYYY')
    ORDER BY mes;
`);
        return result.rows;
    } catch (error) {
        console.error('Erro ao listar recebimento por id - Model:', error);
        throw error;
    }
}

async function Inserir(doacao) {
    try {
        const result = await conexao.query("INSERT INTO RECEBIMENTOS (valor, data_recebimento, sigla_doador) VALUES ($1,$2,$3) RETURNING *",[doacao.valor, doacao.data_recebimento, doacao.sigla]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir recebimento - Model:', error);
        throw error;
    }
}

async function Delete(id) {
    try {
        const result = await conexao.query("DELETE FROM RECEBIMENTOS WHERE id = $1 RETURNING *", [id]);
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

module.exports = RecebimentoModel;*/