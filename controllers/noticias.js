const NoticiasModel = require('../models/noticias');
const path = require('path');

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
            if (!req.files || !req.files.imagem) {
                return res.status(400).json({ erro: "Imagem não enviada." });
            }
            const imagem = req.files.imagem;
            imagem.name = `${req.body.titulo}.png`;

            const diretorioImagens = path.resolve(__dirname, '../public/images/noticias');
            const uploadImagem = path.join(diretorioImagens, imagem.name);
            
            await imagem.mv(uploadImagem);

            const noticia = await NoticiasModel.Inserir(req.body);
            console.log(req.body);
            res.json(noticia);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao inserir noticia - Control" });
        }
    },
    Update: async (req, res) => {
        const id = req.params.id;

        try {
            const noticia = await NoticiasModel.Update(id, req.body);

            if(noticia.affectedRows > 0) {
                res.json({ message: "Notícia atualizado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Notícia ${id} não encontrado - Control` });
            }
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar notícia Control" })
        }
    },
    ListarPorId: async (req, res) => {
        const id = req.params.id;

        try {
            const noticia = await NoticiasModel.ListarPorID(id);
            res.send(noticia);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Listar o notícia por Id - Control" });
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const imovel = await NoticiasModel.Delete(id);

            if (imovel.affectedRows > 0) {
                res.status(200).json({ message: "Notícia deletado com sucesso - Control" });
            } else {
                res.status(404).json({ message: `Notícia ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar usuário" });
        }
    }
}

module.exports = ControlNoticias;