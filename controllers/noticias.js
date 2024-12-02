const NoticiasModel = require('../models/noticias');

const ControlNoticias = {
    Listar: async (req, res) => {
        try {
            const noticias = await NoticiasModel.Listar();
            res.send(noticias);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar noticias - Control" });
        }
    },
    Inserir: async (req, res) => {
        try {
            const noticia = await NoticiasModel.Inserir(req.body);
            res.json(noticia);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao inserir noticia - Control" });
        }
    }
}

module.exports = ControlNoticias;