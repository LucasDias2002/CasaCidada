const conexao = require("../database/conexao");
const bcrypt = require('bcrypt');

const findUser =  (email)=> {
    const sql = `SELECT * FROM USUARIO WHERE email = ?;`
    return new Promise((resolve, reject) => {
        conexao.query(sql, [email], (erro, resposta) => {
            if (erro) {
                console.log("Erro ao achar usuarios por email");
                return reject(erro);
            }
            console.log(`Usuário encontrado com sucesso!`);
            resolve(resposta);
        })
    })
}

module.exports = {findUser};