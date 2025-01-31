const conexao = require("../database/conexaoPostgre");

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
        const sql = "INSERT INTO NOTICIAS (id_cadastrante, titulo, descricao, data_publicacao) VALUES (?,?,?,NOW())";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [noticia.id_usuario, noticia.titulo,noticia.descricao,noticia.data], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao inserir noticia - Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM NOTICIAS WHERE id= ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta[0]);
                console.log("Listando notícias por id!");
            })
        })
    },
    Update: async (id, noticia) => {
        const sql = "UPDATE NOTICIAS SET titulo=?, descricao=? WHERE id=?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [noticia.titulo, noticia.descricao,id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Atualizar notícia - Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Atualizando notícia - Model: ${id}`);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM NOTICIAS WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar notícia - Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando notícia Model: ${id}`);
            })
        })
    }
}

module.exports = NoticiasModel;