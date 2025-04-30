const ImovelModel = require('../models/imovel');
const { sequelize } = require("../database/conexaoPostgre");

const Listar = async (req, res) => {
    try {
        const imoveis = await ImovelModel.findAll();
        res.status(200).json(imoveis);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao listar Imoveis Controler" });
    }
}

const ListarDisponiveis = async (req, res) => {
    try {
        const [imovel] = await sequelize.query(`SELECT * FROM IMOVEL WHERE status = 'Disponivel'`);
        res.status(200).json(imovel);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao listar Imovel disponivel Controler" });
    }
}

const ListarPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const imovel = await ImovelModel.findByPk(id);
        res.status(200).json(imovel);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o imovel por id Controler" });
    }
}

const Inserir = async (req, res) => {
    try {
        const novoImovel = await ImovelModel.create({
            cep: req.body.cep,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            complemento: req.body.complemento || '',
            num_residencia: req.body.num_residencia,
            nome_proprietario: req.body.nome_proprietario,
            telefone: req.body.telefone,
            valor_aluguel: req.body.valor_aluguel,
            descricao: req.body.descricao,
            data_inicio_contrato: req.body.data_inicio_contrato,
            data_termino_contrato: req.body.data_termino_contrato,
            status: req.body.status
        });
        res.status(201).json(novoImovel);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir imovel Controler" });
    }
}

const Update = async (req, res) => {
    try {
        const [atualizados] = await ImovelModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (atualizados === 0) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado para atualização.' });
        }

        const imovelAtualizado = await ImovelModel.findByPk(req.params.id);
        res.status(200).json(imovelAtualizado);
    } catch (erro) {
        res.status(400).json({ erro: 'Erro ao atualizar imóvel Controller', detalhes: erro.message });
    }
};

const UpdateDisponibilidade = async (req, res) => {
    const id = req.params.id;

    try {
        const atualizados = await ImovelModel.update(
            { status: 'Indisponivel' },
            { where: { id: id } }
        )
        res.status(200).json(atualizados);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao atualizar disponibilidade de imovel  Controler" })
    }
}

const Delete = async (req, res) => {
    const id = req.params.id;
    try {
        const imovel = await ImovelModel.destroy({
            where: {
                id: id
            }
        });

        if (imovel.rowCount === 0) {
            res.status(404).json({ message: `Imovel ${id} não encontrado` });
        } else {
            res.status(200).json({ message: "Imovel deletado com sucesso Control" });
        }
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar imovel Control" });
    }
}

module.exports = {
    Listar,
    ListarDisponiveis,
    ListarPorId,
    Inserir,
    Update,
    UpdateDisponibilidade,
    Delete
}