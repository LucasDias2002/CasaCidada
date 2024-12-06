const DepoimentoModel = require('../models/depoimento');

const ControlDepoimentos = {
    Listar: async (req, res) => {
        try {
            const depoimentos = await DepoimentoModel.Listar();
            res.send(depoimentos);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar depoimentos Control" });
        }
    },
    ListarPorId: async (req, res) => {
        const id = req.params.id;

        try {
            const depoimento = await DepoimentoModel.ListarPorID(id);
            res.send(depoimento);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Listar o depoimento por Id Control" });
        }
    },
    Inserir: async (req, res) => {
        try {
            const depoimento = await DepoimentoModel.Inserir(req.body);
            res.json(depoimento);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Inserir depoimento Control" });
        }
    },
    Update: async (req, res) => {
        const id = req.params.id;

        try {
            const depoimento = await DepoimentoModel.Update(id, req.body);

            if(depoimento.affectedRows > 0) {
                res.json({ message: "depoimento atualizado com sucesso Control" });
            } else {
                res.status(404).json({ message: `depoimento ${id} não encontrado Control` });
            }
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar depoimento Control" })
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const depoimento = await DepoimentoModel.Delete(id);

            if (depoimento.affectedRows > 0) {
                res.status(200).json({ message: "depoimento deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `depoimento ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar usuário" });
        }
    }
}

module.exports = ControlDepoimentos;