const DepoimentoModel = require('../models/depoimento');

async function Listar(req, res) {
    try {
        const depoimentos = await DepoimentoModel.listar();
        res.send(depoimentos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar depoimentos Control" });
    }
}

async function ListarPorId(req, res) {
    const id = req.params.id;

    try {
        const depoimento = await DepoimentoModel.ListarPorId(id);
        res.send(depoimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o depoimento por Id Control" });
    }
}

async function Inserir (req, res) {
    try {
        const depoimento = await DepoimentoModel.Inserir(req.body);
        res.json(depoimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir depoimento Control" });
    }
}

async function Update(req, res) {
    const id = req.params.id;

    try {
        const depoimento = await DepoimentoModel.Update(id, req.body);

        if(depoimento.rowCount === 0) {
            res.status(404).json({ message: `depoimento ${id} não encontrado Control` });
        } else {
            res.json({ message: "depoimento atualizado com sucesso Control" });
        }
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar depoimento Control" })
    }
}

async function Delete(req, res) {
    const id = req.params.id;

    try {
        const depoimento = await DepoimentoModel.Delete(id);

        if (depoimento.rowCount === 0) {
            res.status(404).json({ message: `depoimento ${id} não encontrado` });
        } else {
            res.status(200).json({ message: "depoimento deletado com sucesso Control" })
        }
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar usuário" });
    }
}


module.exports = {Listar, ListarPorId, Inserir, Update, Delete};