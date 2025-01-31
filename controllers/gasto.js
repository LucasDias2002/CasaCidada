const GastosModel = require('../models/gasto');

async function Listar(req, res) {
    try {
        const gastos = await GastosModel.Listar();
        res.send(gastos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar gastos Control" });
    }
}

async function ListarPorId(req, res) {
    const id = req.params.id;

    try {
        const gastos = await GastosModel.ListarPorId(id);
        res.send(gastos);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o gastos por Id Control" });
    }
}

async function ListarUltimo2anos(req, res) {
    try {
        const gastos = await GastosModel.ListarUltimo2anos();
        res.send(gastos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar gastos dos ultimos 2 anos - Control" });
    }
}

async function Inserir(req, res) {
    try {
        const gastos = await GastosModel.Inserir(req.body);
        res.json(gastos);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir gastos Control" });
    }
}

async function Delete(req, res) {
    const id = req.params.id;

    try {
        const gastos = await GastosModel.Delete(id);

        if (gastos.rowCount === 0) {
            res.status(404).json({ message: `gasto ${id} não encontrado` });
        } else {
            res.status(200).json({ message: "gasto deletado com sucesso Control" });
        }
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar usuário" });
    }
}


module.exports = { Listar, ListarPorId, ListarUltimo2anos, Inserir, Delete };