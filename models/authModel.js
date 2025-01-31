const conexao = require("../database/conexaoPostgre");

const findUser =  async (email)=> {
    const sql = `SELECT * FROM USUARIO WHERE email = $1;`

    return new Promise((resolve, reject) => {
        conexao.query(sql, [email], (erro, resposta) => {
            if (erro) {
                console.log("Erro ao achar usuarios por email");
                return reject(erro);
            }
            console.log(`Usuário encontrado com sucesso!`);
            console.log("Essa é respota das ROWSSSSSS: " + resposta.rows[0])
            resolve(resposta.rows[0]);
        })
    })
}

module.exports = {findUser};