const conexao = require("../database/conexao");

const ImovelModel = {
    Listar: async () => {
        const sql = "SELECT * FROM IMOVEL;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
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
            conexao.query(sql, (erro, resposta) => {
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
            conexao.query(sql, [id], (erro, resposta) => {
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
            conexao.query(sql, [imovel.cep, imovel.endereco,imovel.bairro, imovel.complemento, imovel.num_residencia, imovel.nome_proprietario, imovel.telefone,imovel.valor_aluguel ,imovel.descricao,imovel.data_inicio_contrato, imovel.data_termino_contrato ,imovel.status], (erro, resposta) => {
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
            conexao.query(sql, [imovel.cep, imovel.endereco, imovel.bairro, imovel.complemento, imovel.num_residencia, imovel.nome_proprietario, imovel.telefone, imovel.valor_aluguel, imovel.descricao, imovel.data_inicio_contrato, imovel.data_termino_contrato, imovel.status,  id], (erro, resposta) => {
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
            conexao.query(sql, [id], (erro, resposta) => {
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
            conexao.query(sql, [id], (erro, resposta) => {
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

module.exports = ImovelModel;