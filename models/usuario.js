const { sequelize } = require("../database/conexaoPostgre");

const bcrypt = require('bcrypt'); // Para criptografar senhas


async function listar() {
    try {
        const result = await sequelize.query('SELECT * FROM USUARIO;')
        return result.rows;
    } catch (error) {
        console.error('Erro ao Listar usuário Model:', error);
        throw error;
    }
}

async function ListarPorId(id) {
    try {
        const result = await sequelize.query('SELECT * FROM USUARIO WHERE id = $1;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao ListarPorId usuário Model:', error);
        throw error;
    }
}

async function ListarPorEmail(email) {
    try {
        const result = await sequelize.query('SELECT * FROM USUARIO WHERE EMAIL = $1;', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao ListarPorEmail usuário Model:', error);
        throw error;
    }
}

async function Inserir(usuario) {
    try {
        const passwordHash = await bcrypt.hash(usuario.senha, 8); //para criptografar
        const result = await sequelize.query('INSERT INTO usuario (nome, email, senha, telefone, permissao, data_nasc, data_criacao) VALUES ($1, $2, $3 , $4, $5, $6, CURRENT_TIMESTAMP)', [usuario.nome, usuario.email, passwordHash, usuario.telefone, 3, usuario.data_nasc]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Inserir usuário Model:', error);
        throw error;
    }
}

async function Update(id, usuario) {
    try {
        const result = await sequelize.query('UPDATE usuario SET cpf = $1, nome= $2, email =$3 , telefone = $4, data_nasc = $5, data_criacao = $6 , cep = $7 , num_residencia = $8 WHERE id = $9;', [usuario.cpf, usuario.nome, usuario.email, usuario.telefone, usuario.data_nasc, usuario.data_criacao, usuario.cep, usuario.num_residencia, id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Update usuário Model:', error);
        throw error;
    }
}

async function Delete(id) {
    try {
        const result = await sequelize.query('DELETE from usuario where id = $1;' [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao Deletar usuário Model:', error);
        throw error;
    }
}

module.exports = {
    listar,
    ListarPorId,
    ListarPorEmail,
    Inserir,
    Update,
    Delete
}


/* Codigo antigo para Mysql
const UsuarioModel = {
    listar: () => {
        const sql = "SELECT * FROM USUARIO";
        return new Promise((resolve, reject) => {
            sequelize.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao listar usuarios: Model");
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Listando usuarios!");
            })
        })
    },
    listarPorId: (id) => {
        const sql = `SELECT * FROM USUARIO WHERE id = ?;`
        return new Promise((resolve, reject) => {
            sequelize.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao listar usuarios");
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Listando usuário com ID: ${id}`);
            })
        })
    },
    listarPorEmail: (email) => {
        const sql = `SELECT * FROM USUARIO WHERE EMAIL = ?`;
        return new Promise((resolve, reject) => {
            sequelize.query(sql, [email], (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao listar usuario por email", erro);
                    return reject(erro);
                }
                console.log(`Listando usuário com email: ${email}`);
                resolve(resposta);
            })
        })
    },
    Inserir: async (usuario) => {
        const sql = ` INSERT INTO usuario (nome, email, senha, telefone, permissao, data_nasc, data_criacao) VALUES (?, ?, ? , ?, ?, ?, NOW())`;

        const passwordHash = await bcrypt.hash(usuario.senha, 8);
        return new Promise((resolve, reject) => {
            // Passando os valores do objeto usuario para a consulta SQL
            sequelize.query(sql, [usuario.nome, usuario.email, passwordHash, usuario.telefone, 3, usuario.data_nasc], (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao inserir usuário:", erro);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Usuário inserido com ID: ${resposta.insertId}`);
            });
        });
    },
    Update: async (id, usuario) => {
        const sql = "UPDATE usuario SET cpf = ?, nome= ?, email =? , telefone = ?, data_nasc = ?, data_criacao = ? , cep = ? , num_residencia = ? WHERE id = ?;"

        return new Promise((resolve, reject) => {
            // Passando os valores do objeto usuario para a consulta SQL
            sequelize.query(sql, [usuario.cpf, usuario.nome, usuario.email, usuario.telefone, usuario.data_nasc, usuario.data_criacao, usuario.cep, usuario.num_residencia, id], (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao atualizar usuário Model:", erro);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Usuário atualizado com id ${id}!`);
            });
        });
    },
    Delete: async (id) => {
        const sql = "DELETE from usuario where id = ?";
        return new Promise((resolve, reject) => {
            // Passando os valores do objeto usuario para a consulta SQL
            sequelize.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao deletar usuário Model:", erro);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Usuário deletado com id ${id}!`);
            });
        });
    }
}

module.exports = UsuarioModel;

*/