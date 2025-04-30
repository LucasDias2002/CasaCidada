const { sequelize } = require('../database/conexaoPostgre');
const AssistidoModel = require('../models/assistido');

const Listar = async (req, res) => {
    try {
        const [assistido] = await sequelize.query('SELECT A.NOME,A.ID, A.CPF, A.TELEFONE, A.DATA_NASC, A.ID_IMOVEL, I.ENDERECO, I.NUM_RESIDENCIA, I.BAIRRO, I.COMPLEMENTO  FROM imovel I RIGHT JOIN assistido A ON A.id_imovel = I.id;');
        res.status(200).json(assistido);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao listar assisitido Control' });
    }
}

const ListarPorID = async (req, res) => {
    const id = req.params.id;
    try {
        const assistido = await AssistidoModel.findByPk(id);
        res.status(200).json(assistido);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o assistido por Id Control" });
    }
}

const Inserir = async (req, res) => {
    try {
        const assistido = await AssistidoModel.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            data_nasc: req.body.data_nasc,
            data_cadastro: req.body.data_cadastro,
            id_imovel: req.body.id_imovel,
        });
        res.status(201).json(assistido);

    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir assistido Control" });
    }
}

const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const [assistido] = await AssistidoModel.update(req.body, {
            where: { id:id }
        });

        if (assistido.rowCount === 0) {
            res.status(404).json({ message: `Assistido ${id} não encontrado Control` });
        } else {
            res.status(200).json({ message: "Assistido atualizado com sucesso Control" });
        }
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar assistido Control" })
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        const assistido = await AssistidoModel.destroy({
            where: { id }
        });

        if (resultado.rowCount === 0) {
            res.status(404).json({ message: `Assistido ${id} não encontrado` });
        } else {
            res.status(200).json(assistido);
        }
    } catch (erro) {
        console.error("Erro ao deletar assistido: ", erro);
        res.status(500).json({ erro: "Erro ao deletar Assistido" });
    }
}

module.exports = {
    Listar,
    ListarPorID,
    Inserir,
    Update,
    Delete
}