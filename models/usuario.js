const conexao = require("../database/conexao");
const bcrypt = require('bcrypt'); // Para criptografar senhas

const UsuarioModel = {
    listar : () =>{
        const sql = "SELECT * FROM USUARIO";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao listar usuarios: Model");
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Listando usuarios!");
            })
        })
    },
    listarPorId: (id)=> {
        const sql = `SELECT * FROM USUARIO WHERE id = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log("Erro ao listar usuarios");
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Listando usuário com ID: ${id}`);
            })
        })
    },
    Inserir: async (usuario) => {
        const sql = `INSERT INTO usuario (cpf, nome, email, senha, telefone, data_nasc, data_criacao) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        
        const passwordHash = await bcrypt.hash(usuario.senha, 8);
        return new Promise((resolve, reject) => {
            // Passando os valores do objeto `usuario` para a consulta SQL
            conexao.query(sql, [usuario.cpf, usuario.nome, usuario.email, passwordHash, usuario.telefone, usuario.data_nasc], (erro, resposta) => {
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
        const sql = `UPDATE usuario SET cpf = ?, nome= ?, email =? , telefone = ?, data_nasc = ?, data_criacao = ? , cep = ? , num_residencia = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            // Passando os valores do objeto `usuario` para a consulta SQL
            conexao.query(sql, [usuario.cpf, usuario.nome, usuario.email, usuario.telefone, usuario.data_nasc, usuario.data_criacao, usuario.cep, usuario.num_residencia, id], (erro, resposta) => {
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
            // Passando os valores do objeto `usuario` para a consulta SQL
            conexao.query(sql, [id], (erro, resposta) => {
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