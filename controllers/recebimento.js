const Recebimento = require('../models/recebimento');
const { sequelize } = require('../database/conexaoPostgre');

const Listar = async (req, res) => {
    try {
        const rebecimentos = await Recebimento.findAll();
        res.status(200).json(rebecimentos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar rebecimentos - Controler" });
    }
}
const ListarPorId = async (req, res) =>{
    const id = req.params.id;

    try {
        const recebimento = await Recebimento.findByPk(id);
        res.status(200).json(recebimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o recebimento por Id - Controler" });
    }
}
const Inserir = async (req, res) =>{
    try {
        const recebimento = await Recebimento.create({
            valor: req.body.valor,
            data_recebimento: req.body.data_recebimento,
            sigla_doador: req.body.sigla_doador,
        });
        res.status(201).json(recebimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir recebimento - Controler" });
    }
}
const ListarUltimo2anos = async (req, res) =>{
    try {
        const [rebecimentos] = await sequelize.query(`SELECT 
            TO_CHAR(r.data_recebimento, 'MM-YYYY') AS mes,
            SUM(r.valor) AS total_recebimentos
            FROM recebimentos r
            WHERE EXTRACT(YEAR FROM r.data_recebimento) >= EXTRACT(YEAR FROM CURRENT_DATE) - 2
            GROUP BY TO_CHAR(r.data_recebimento, 'MM-YYYY')
            ORDER BY mes;
        `);
        res.status(200).json(rebecimentos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar rebecimentos dos ultimos 2 anos - Controler" });
    }
}
const Delete = async (req, res) =>{
    const id = req.params.id;

    try {
        const recebimento = await Recebimento.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(recebimento);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar recebimento" });
    }
}


module.exports = {Delete, Inserir, Listar, ListarPorId, ListarUltimo2anos};