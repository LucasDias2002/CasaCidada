const InteressadoModel = require('../models/interessado');

const Listar = async (req, res) => {
    try {
        const interessado = await InteressadoModel.findAll();
        res.status(200).json(interessado);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao listar interessado Controler" });
    }
}


const Inserir = async (req, res) => {
    try {
        const novoInteressado = await InteressadoModel.create({
            nome: req.body.nome,
            email: req.body.email,
        });
        res.status(201).json(novoInteressado);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir interessado Controler" });
    }
}

module.exports = {
    Listar,
    Inserir
}