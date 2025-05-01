const Noticia = require('../models/noticias');

const criarNoticia = async (req, res) => {
    try {
        const nova = await Noticia.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            id_cadastrante: req.user.id,    // vindo do middleware de auth
            imagem: req.file?.path || ''
        });
        console.log(nova.imagem)
        res.status(201).json(nova);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar notícia' });
    }
};

const listarNoticias = async (req, res) => {
    try {
        const noticias = await Noticia.findAll({
            order: [['data_publicacao', 'DESC']],
        });
        res.status(200).json(noticias);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao listar notícia' });
    }
}
const listarNoticiasPorId = async (req, res) => {
    try {
        const noticias = await Noticia.findOne({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(noticias);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao listar notícia por id' });
    }
}

const deletar = async (req, res) => {
    try {
        const noticia = await Noticia.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(noticia);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao listar notícia' });
    }
}
module.exports = {
    criarNoticia,
    listarNoticias,
    listarNoticiasPorId,
    deletar
};