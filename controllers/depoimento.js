const Depoimento = require('../models/depoimento');

const Listar = async (req, res) => {
    try {
        const noticias = await Depoimento.findAll();
        res.status(200).json(noticias);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar depoimentos Control" });
    }
}

const ListarPorId = async (req, res) =>  {
    const id = req.params.id;

    try {
        const depoimento = await Depoimento.findByPk(id);
        res.status(200).json(depoimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o depoimento por Id Control" });
    }
}

const Inserir = async (req, res) => {
    try {
        const novo = await Depoimento.create({
            nome: req.body.nome,
            descricao: req.body.depoimento,
        }); 

        res.status(201).json(novo);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir depoimento Control" });
    }
}

const Delete = async (req, res) =>  {
    const id = req.params.id;

    try {
        const depoimento = await Depoimento.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar depoimento" });
    }
}


module.exports = {Listar, ListarPorId, Inserir, Delete};