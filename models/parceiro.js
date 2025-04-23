const { sequelize } = require("../database/conexaoPostgre");


async function Listar() {
    try {
        const result = await sequelize.query('SELECT * FROM PARCEIRO;');
        return result.rows;
    } catch (error) {
        console.error('Erro ao listar parceiros - Model:', error);
        throw error;
    }
}

async function ListarPorID(id) {
    try {
        const result = await sequelize.query('SELECT * FROM PARCEIRO WHERE id= $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao listar por id parceiro Model:', error);
        throw error;
    }
}

async function Inserir(parceiro) {
    try {
        const result = await sequelize.query('INSERT INTO PARCEIRO (nome, email, tipo, cnpj, area_atuacao, telefone) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [parceiro.nome, parceiro.email, parceiro.tipo, parceiro.cnpj, parceiro.area_atuacao, parceiro.telefone]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Inserir parceiro Model:', error);
        throw error;
    }
}

async function Update(id, parceiro) {
    try {
        const result = await sequelize.query('UPDATE PARCEIRO SET nome=$1, email=$2,tipo=$3,cnpj=$4,area_atuacao=$5,telefone=$6 WHERE id=$7 RETURNING *',  [parceiro.nome, parceiro.email, parceiro.tipo, parceiro.cnpj, parceiro.area_atuacao, parceiro.telefone, id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Update parceiro Model:', error);
        throw error;
    }
}

async function Delete(id) {
    console.log(id)
    try {
        const result = await sequelize.query('DELETE FROM PARCEIRO WHERE id = $1 RETURNING *;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Delete parceiro Model:', error);
        throw error;
    }
}

module.exports = {
    Listar,
    ListarPorID,
    Inserir,
    Update,
    Delete
}

/*
const ParceiroModel = {
    Listar: async () => {
        const sql = "SELECT * FROM PARCEIRO;";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar parceiros Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando parceiros Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM PARCEIRO WHERE id= ?";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Listando parceiro por id!");
            })
        })
    },
    Inserir: async (parceiro) => {
        const sql = "INSERT INTO PARCEIRO (nome, email, tipo, cnpj, area_atuacao, telefone) VALUES (?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [parceiro.nome, parceiro.email, parceiro.tipo, parceiro.cnpj, parceiro.area_atuacao, parceiro.telefone], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir parceiro Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
            })
        })
    },
    Update: async (id, parceiro) => {
        const sql = "UPDATE PARCEIRO SET nome=?, email=?,tipo=?,cnpj=?,area_atuacao=?,telefone=? WHERE id=?";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [parceiro.nome, parceiro.email, parceiro.tipo, parceiro.cnpj, parceiro.area_atuacao, parceiro.telefone, id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Atualizar Imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Atualizando ímovel Model: ${id}`);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM PARCEIRO WHERE id = ?";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar Parceiro Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando Parceiro Model: ${id}`);
            })
        })
    }
}

module.exports = ParceiroModel;*/