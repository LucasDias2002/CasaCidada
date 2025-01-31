const RecebimentoModel = require('../models/recebimento');

async function Listar(req, res){
    try {
        const rebecimentos = await RecebimentoModel.Listar();
        res.send(rebecimentos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar rebecimentos Control" });
    }
}
async function ListarPorId(req, res){
    const id = req.params.id;

    try {
        const recebimento = await RecebimentoModel.ListarPorId(id);
        res.send(recebimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o recebimento por Id Control" });
    }
}
async function Inserir(req, res) {
    try {
        const recebimento = await RecebimentoModel.Inserir(req.body);
        res.json(recebimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir recebimento Control" });
    }
}
async function ListarUltimo2anos(req, res) {
    try {
        const rebecimentos = await RecebimentoModel.ListarUltimo2anos();
        res.send(rebecimentos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar rebecimentos dos ultimos 2 anos - Control" });
    }
}
async function Delete(req, res) {
    const id = req.params.id;

    try {
        const recebimento = await RecebimentoModel.Delete(id);

        if (recebimento.rowCount === 0) {
            res.status(404).json({ message: `recebimento ${id} não encontrado` });
        } else {
            res.status(200).json({ message: "recebimento deletado com sucesso Control" });
        }
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar usuário" });
    }
}


module.exports = {Delete, Inserir, Listar, ListarPorId, ListarUltimo2anos};