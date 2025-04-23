const { sequelize } = require("../database/conexaoPostgre");

async function Listar() {
    try {
        const result = await sequelize.query('SELECT * FROM IMOVEL;');
        return result.rows;
    } catch (error) {
        console.error('Erro ao Listar imovel Model:', error);
        throw error;
    }
}

async function ListarDisponiveis() {
    try {
        const result = await sequelize.query(`SELECT * FROM IMOVEL WHERE status = 'Disponivel'`);
        return result.rows;
    } catch (error) {
        console.error('Erro ao ListarDisponiveis imovel Model:', error);
        throw error;
    }
}

async function ListarPorID(id) {
    try {
        const result = await sequelize.query('SELECT * FROM IMOVEL WHERE id= $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao ListarPorID imovel Model:', error);
        throw error;
    }
}

async function Inserir(imovel) {
    try {
        const result = await sequelize.query('INSERT INTO IMOVEL (cep,endereco,bairro,complemento,num_residencia,nome_proprietario,telefone,valor_aluguel,descricao,data_inicio_contrato,data_termino_contrato,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [imovel.cep, imovel.endereco, imovel.bairro, imovel.complemento, imovel.num_residencia, imovel.nome_proprietario, imovel.telefone, imovel.valor_aluguel, imovel.descricao, imovel.data_inicio_contrato, imovel.data_termino_contrato, imovel.status]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Inserir imovel Model:', error);
        throw error;
    }
}

async function Update(id, imovel) {
    try {
        const result = await sequelize.query('UPDATE IMOVEL SET cep=$1 ,endereco= $2, bairro= $3,complemento= $4, num_residencia= $5,nome_proprietario=$6,telefone=$7, valor_aluguel=$8,descricao=$9, data_inicio_contrato=$10, data_termino_contrato=$11,status=$12 WHERE id=$13 RETURNING *', [imovel.cep, imovel.endereco, imovel.bairro, imovel.complemento, imovel.num_residencia, imovel.nome_proprietario, imovel.telefone, imovel.valor_aluguel, imovel.descricao, imovel.data_inicio_contrato, imovel.data_termino_contrato, imovel.status, id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Update imovel Model:', error);
        throw error;
    }
}

async function Delete(id) {
    console.log(id)
    try {
        const result = await sequelize.query('DELETE FROM IMOVEL WHERE id = $1 RETURNING *;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Delete imovel Model:', error);
        throw error;
    }
}

module.exports = {
    Listar,
    ListarDisponiveis,
    ListarPorID,
    Inserir,
    Update,
    Delete
}

/*
const ImovelModel = {
    Listar: async () => {
        const sql = "SELECT * FROM IMOVEL;";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando imóvel Model!')
            })
        })
    },
    ListarDisponiveis: async () => {
        const sql = "SELECT * FROM IMOVEL WHERE status='disponivel';";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar imoveis Disponiveis Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando imóveis Disponiveis Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM IMOVEL WHERE id= ?";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta[0]);
                console.log("Listando Imovel por id!");
            })
        })
    },
    Inserir: async (imovel) => {
        const sql = "INSERT INTO IMOVEL (cep,endereco,bairro,complemento,num_residencia,nome_proprietario,telefone,valor_aluguel,descricao,data_inicio_contrato,data_termino_contrato,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [imovel.cep, imovel.endereco, imovel.bairro, imovel.complemento, imovel.num_residencia, imovel.nome_proprietario, imovel.telefone, imovel.valor_aluguel, imovel.descricao, imovel.data_inicio_contrato, imovel.data_termino_contrato, imovel.status], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir Imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Inserindo Ímovel Model " + resposta.InsertId);
            })
        })
    },
    Update: async (id, imovel) => {
        const sql = "UPDATE IMOVEL SET cep=?,endereco=?, bairro=?,complemento=?, num_residencia=?,nome_proprietario=?,telefone=?, valor_aluguel=?,descricao=?, data_inicio_contrato=?, data_termino_contrato=?,status=? WHERE id=?";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [imovel.cep, imovel.endereco, imovel.bairro, imovel.complemento, imovel.num_residencia, imovel.nome_proprietario, imovel.telefone, imovel.valor_aluguel, imovel.descricao, imovel.data_inicio_contrato, imovel.data_termino_contrato, imovel.status, id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Atualizar Imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Atualizando ímovel Model: ${id}`);
            })
        })
    },
    UpdateDisponibilidade: async (id) => {
        const sql = "UPDATE IMOVEL SET status='Indisponivel' WHERE id=?;";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [id], (erro, resposta) => {
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
        const sql = "DELETE FROM IMOVEL WHERE id = ?";

        return new Promise((resolve, reject) => {
            sequelize.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar Ímovel Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando ímovel Model: ${id}`);
            })
        })
    }
}

module.exports = ImovelModel;*/