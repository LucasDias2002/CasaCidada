const conexao = require("../database/conexao");

const NoticiasModel = {
    Listar: async () => {
        const sql = "SELECT * FROM NOTICIAS;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar noticias - Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
            })
        })
    },
    Inserir: async (noticia) => {
        const sql = "INSERT INTO NOTICIAS (id_cadastrante, titulo, descricao, data) VALUES (?,?,?,NOW())";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id_usuario, noticia.titulo,noticia.descricao,noticia.data], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao inserir noticia - Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
            })
        })
    }
}

module.exports = NoticiasModel;