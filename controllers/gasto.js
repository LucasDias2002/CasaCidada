const Gasto = require('../models/gasto');
const { sequelize } = require("../database/conexaoPostgre");

const Listar = async (req, res) => {
    try {
        const gastos = await Gasto.findAll();
        res.status(200).json(gastos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar gastos Control" });
    }
}

const ListarPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const gastos = await Gasto.findByPk(id);
        res.status(200).json(gastos);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o gastos por Id Control" });
    }
}

const ListarUltimo2anos = async (req, res) => {
    try {
        const [gastos] = await sequelize.query(`SELECT TO_CHAR(g.data_gasto, 'MM-YYYY') AS mes, SUM(g.valor) AS total_gastos FROM gastos g WHERE EXTRACT(YEAR FROM g.data_gasto) >= EXTRACT(YEAR FROM CURRENT_DATE) - 2 GROUP BY TO_CHAR(g.data_gasto, 'MM-YYYY') ORDER BY mes;`);
        res.status(200).json(gastos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar gastos dos ultimos 2 anos - Control" });
    }
}

const Inserir = async (req, res) => {
    try {
        const gastos = await Gasto.create({
            valor: req.body.valor,
            data_gasto: req.body.data_gasto,
            descricao: req.body.descricao,
        });
        res.status(201).json(gastos);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir gastos Control" });
    }
}

const Delete = async (req, res) => {
    const id = req.params.id;

    try {
        const gastos = await Gasto.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(gastos)
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar gasto" });
    }
}


module.exports = { Listar, ListarPorId, ListarUltimo2anos, Inserir, Delete };