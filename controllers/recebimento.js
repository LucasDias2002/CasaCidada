const RecebimentoModel = require('../models/recebimento');

const ControlRecebimento = {
    Listar: async (req, res) => {
        try {
            const rebecimentos = await RecebimentoModel.Listar();
            res.send(rebecimentos);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar rebecimentos Control" });
        }
    },
    ListarPorId: async (req, res) => {
        const id = req.params.id;

        try {
            const recebimento = await RecebimentoModel.ListarPorID(id);
            res.send(recebimento);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Listar o recebimento por Id Control" });
        }
    },
    Inserir: async (req, res) => {
        try {
            const recebimento = await RecebimentoModel.Inserir(req.body);
            res.json(recebimento);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Inserir recebimento Control" });
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const recebimento = await RecebimentoModel.Delete(id);

            if (recebimento.affectedRows > 0) {
                res.status(200).json({ message: "recebimento deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `recebimento ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar usuário" });
        }
    }
}

module.exports = ControlRecebimento;