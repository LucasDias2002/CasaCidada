const GastosModel = require('../models/gasto');

const ControlGastos = {
    Listar: async (req, res) => {
        try {
            const gastos = await GastosModel.Listar();
            res.send(gastos);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar gastos Control" });
        }
    },
    ListarPorId: async (req, res) => {
        const id = req.params.id;

        try {
            const gastos = await GastosModel.ListarPorID(id);
            res.send(gastos);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Listar o gastos por Id Control" });
        }
    },
    Inserir: async (req, res) => {
        try {
            const gastos = await GastosModel.Inserir(req.body);
            res.json(gastos);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Inserir gastos Control" });
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const gastos = await GastosModel.Delete(id);

            if (gastos.affectedRows > 0) {
                res.status(200).json({ message: "gasto deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `gasto ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar usuário" });
        }
    }
}

module.exports = ControlGastos;