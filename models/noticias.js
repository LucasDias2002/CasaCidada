// const conexao = require("../database/conexaoPostgre");



// async function Listar() {
//     try {
//         const result = await conexao.query('SELECT * FROM NOTICIAS ORDER BY data_publicacao DESC;');
//         return result.rows;
//     } catch (error) {
//         console.error('Erro ao Listar Noticias Model:', error);
//         throw error;
//     }
// }

// async function Inserir(noticia) {
//     try {
//         const result = await conexao.query('INSERT INTO NOTICIAS (id_cadastrante, titulo, descricao, data_publicacao) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)', [noticia.id_usuario, noticia.titulo, noticia.descricao]); // CURRENT_TIMESTAMP == NOW() {para pegar hora atual}
//         return result.rows[0];
//     } catch (error) {
//         console.error('Erro ao Inserir Noticias Model:', error);
//         throw error;
//     }
// }

// async function ListarPorID(id) {
//     try {
//         const result = await conexao.query('SELECT * FROM NOTICIAS WHERE id= $1', [id]);
//         return result.rows[0];
//     } catch (error) {
//         console.error('Erro ao ListarPorID Noticias Model:', error);
//         throw error;
//     }
// }

// async function Update(id, noticia) {
//     try {
//         const result = await conexao.query('UPDATE NOTICIAS SET titulo=$1, descricao=$2 WHERE id=$3 RETURNING *', [noticia.titulo, noticia.descricao, id]);
//         return result.rows[0];
//     } catch (error) {
//         console.error('Erro ao Update Noticias Model:', error);
//         throw error;
//     }
// }

// async function Delete(id) {
//     try {
//         const result = await conexao.query('DELETE FROM NOTICIAS WHERE id = $1 RETURNING *', [id]);
//         return result.rows[0];
//     } catch (error) {
//         console.error('Erro ao Delete Noticias Model:', error);
//         throw error;
//     }
// }

// module.exports = {
//     Listar,
//     Inserir,
//     ListarPorID,
//     Update,
//     Delete
// }

// /*
// const NoticiasModel = {
//     Listar: async () => {
//         const sql = "SELECT * FROM NOTICIAS;";

//         return new Promise((resolve, reject) => {
//             conexao.query(sql, (erro, resposta) => {
//                 if (erro) {
//                     console.log(`Erro ao listar noticias - Model: ${erro}`);
//                     return reject(erro);
//                 }
//                 resolve(resposta);
//             })
//         })
//     },
//     Inserir: async (noticia) => {
//         const sql = "INSERT INTO NOTICIAS (id_cadastrante, titulo, descricao, data_publicacao) VALUES (?,?,?,NOW())";

//         return new Promise((resolve, reject) => {
//             conexao.query(sql, [noticia.id_usuario, noticia.titulo, noticia.descricao, noticia.data], (erro, resposta) => {
//                 if (erro) {
//                     console.log(`Erro ao inserir noticia - Model: ${erro}`);
//                     return reject(erro);
//                 }
//                 resolve(resposta);
//             })
//         })
//     },
//     ListarPorID: async (id) => {
//         const sql = "SELECT * FROM NOTICIAS WHERE id= ?";

//         return new Promise((resolve, reject) => {
//             conexao.query(sql, [id], (erro, resposta) => {
//                 if (erro) {
//                     console.log(`Erro ao listar por ID: ${erro}`);
//                     return reject(erro);
//                 }
//                 resolve(resposta[0]);
//                 console.log("Listando notícias por id!");
//             })
//         })
//     },
//     Update: async (id, noticia) => {
//         const sql = "UPDATE NOTICIAS SET titulo=?, descricao=? WHERE id=?";

//         return new Promise((resolve, reject) => {
//             conexao.query(sql, [noticia.titulo, noticia.descricao, id], (erro, resposta) => {
//                 if (erro) {
//                     console.log(`Erro ao Atualizar notícia - Model: ${erro}`);
//                     return reject(erro);
//                 }
//                 resolve(resposta);
//                 console.log(`Atualizando notícia - Model: ${id}`);
//             })
//         })
//     },
//     Delete: async (id) => {
//         const sql = "DELETE FROM NOTICIAS WHERE id = ?";

//         return new Promise((resolve, reject) => {
//             conexao.query(sql, [id], (erro, resposta) => {
//                 if (erro) {
//                     console.log(`Erro ao deletar notícia - Model: ${id}`);
//                     return reject(erro);
//                 }
//                 resolve(resposta);
//                 console.log(`Deletando notícia Model: ${id}`);
//             })
//         })
//     }
// }

// module.exports = NoticiasModel;*/
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conexaoPostgre');

const Noticia = sequelize.define('Noticia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cadastrante: {
        type : DataTypes.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: true
          }
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    data_publicacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'noticias',
    timestamps: false   // se preferir createdAt/updatedAt automáticos, deixe true
  });

  module.exports = Noticia;