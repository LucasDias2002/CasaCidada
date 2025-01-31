const conexao = require("../database/conexaoPostgre");

const AssistidoModel = {
    Listar: async () => {
        const sql = 'SELECT A.NOME,A.ID, A.CPF, A.TELEFONE, A.DATA_NASC, A.ID_IMOVEL, I.ENDERECO, I.NUM_RESIDENCIA, I.BAIRRO, I.COMPLEMENTO  FROM imovel I RIGHT JOIN assistido A ON A.id_imovel = I.id;';

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log('Erro ao lista assistido Model: ' + erro);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando Assistido Model');
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = 'SELECT * FROM ASSISTIDO WHERE id=?';

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log('Erro ao listar assistido por id Model');
                    return reject(erro);
                }
                resolve(resposta[0]);
                console.log('Listando assistido por id Model');
            })
        })
    },
    Inserir: async (assistido) => {
        const sql = "INSERT INTO ASSISTIDO (nome, cpf, telefone, data_nasc, data_cadastro, id_imovel) VALUES (?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [assistido.nome, assistido.cpf, assistido.telefone, assistido.data_nasc, assistido.data_cadastro, assistido.id_imovel], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir assistido Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Inserindo assistido Model " + resposta.InsertId);
            })
        })
    },
    Update: async (id, assistido) => {
        const sql = "UPDATE ASSISTIDO SET nome=?, cpf=?, telefone=?, data_nasc=?, id_imovel=? WHERE id=?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [assistido.nome, assistido.cpf, assistido.telefone, assistido.data_nasc, assistido.id_imovel, id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Atualizar assistido Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Atualizando assistido Model: ${id}`);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM ASSISTIDO WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar assistido Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando assistido Model: ${id}`);
            })
        })
    }
}
module.exports = AssistidoModel;