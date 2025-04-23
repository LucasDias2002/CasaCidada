// const NoticiasModel = require('../models/noticias');
// const path = require('path');
// const fs = require('fs');

// //Verifica se há a pasta de imagens para noticias, se não cria uma automaticamente
// const diretorioImagens = path.resolve(__dirname, '../public/images/noticias');
// if (!fs.existsSync(diretorioImagens)) {
//     fs.mkdirSync(diretorioImagens, { recursive: true });
// }

// async function Listar(req, res) {
//     try {
//         const noticias = await NoticiasModel.Listar();
//         res.send(noticias);
//     } catch (erro) {
//         res.status(500).json({ erro: "Erro ao listar noticias - Control" });
//     }
// }

// async function Inserir(req, res) {
//     try {
//         if (!req.files || !req.files.imagem) {
//             return res.status(400).json({ erro: "Imagem não enviada." });
//         }
//         const imagem = req.files.imagem;
//         imagem.name = `${req.body.titulo}`;

//         let nomeImg = "";
//         if (imagem) {
//             const tipoImagem = imagem.type;
//             if (tipoImagem === 'image/png') {
//                 imagem.name += ".png";
//             } else if (tipoImagem === 'image/jpeg') {
//                 imagem.name += ".jpg";
//             }
//         }
//         const diretorioImagens = path.resolve(__dirname, '../public/images/noticias');
//         const uploadImagem = path.join(diretorioImagens, imagem.name);

//         await imagem.mv(uploadImagem);

//         const noticia = await NoticiasModel.Inserir(req.body);
//         console.log(req.body);
//         res.json(noticia);
//     } catch (erro) {
//         res.status(400).json({ erro: "Erro ao inserir noticia - Control" });
//     }
// }

// async function ListarPorId(req, res) {
//     const id = req.params.id;

//     try {
//         const noticia = await NoticiasModel.ListarPorID(id);
//         res.send(noticia);
//     } catch (erro) {
//         res.status(400).json({ erro: "Erro ao Listar o notícia por Id - Control" });
//     }
// }

// async function Update(req, res) {
//     const id = req.params.id;

//     try {
//         const noticia = await NoticiasModel.Update(id, req.body);

//         if (noticia.rowCount === 0) {
//             res.status(404).json({ message: `Notícia ${id} não encontrado - Control` });
//         } else {
//             res.json({ message: "Notícia atualizado com sucesso Control" });
//         }
//     } catch (erro) {
//         res.status(500).json({ erro: "Erro ao atualizar notícia Control" })
//     }
// }

// async function Delete(req, res) {
//     const id = req.params.id;

//     try {
//         const noticia = await NoticiasModel.ListarPorID(id);
//         console.log(noticia)

//         if (!noticia || !noticia.titulo) {
//             return res.status(404).json({ erro: "noticia não encontrado ou nome não disponível." });
//         }

//         const diretorioImagens = path.resolve(__dirname, '../public/images/noticias');

//         const caminhoImagem = path.join(diretorioImagens, `${noticia.titulo}`);

//         if (fs.existsSync(caminhoImagem)) {
//             await fs.promises.unlink(caminhoImagem);
//             console.log(`Imagem ${noticia.titulo} deletada com sucesso.`);
//         } else {
//             console.log("Imagem não encontrada, prosseguindo com a exclusão do registro.");
//         }


//         const imovel = await NoticiasModel.Delete(id);

//         if (imovel.rowCount === 0) {
//             res.status(404).json({ message: `Notícia ${id} não encontrado` });
//         } else {
//             res.status(200).json({ message: "Notícia deletado com sucesso - Control" });
//         }
//     } catch (erro) {
//         res.status(400).json({ erro: "Erro ao deletar usuário" });
//     }
// }

// module.exports = {
//     Listar,
//     ListarPorId,
//     Inserir,
//     Update,
//     Delete
// }

// /*
// const ControlNoticias = {
//     Listar: async (req, res) => {
//         try {
//             const noticias = await NoticiasModel.Listar();
//             res.send(noticias);
//         } catch (erro) {
//             res.status(500).json({ erro: "Erro ao listar noticias - Control" });
//         }
//     },
//     Inserir: async (req, res) => {
//         try {
//             if (!req.files || !req.files.imagem) {
//                 return res.status(400).json({ erro: "Imagem não enviada." });
//             }
//             const imagem = req.files.imagem;
//             imagem.name = `${req.body.titulo}.png`;

//             const diretorioImagens = path.resolve(__dirname, '../public/images/noticias');
//             const uploadImagem = path.join(diretorioImagens, imagem.name);

//             await imagem.mv(uploadImagem);

//             const noticia = await NoticiasModel.Inserir(req.body);
//             console.log(req.body);
//             res.json(noticia);
//         } catch (erro) {
//             res.status(400).json({ erro: "Erro ao inserir noticia - Control" });
//         }
//     },
//     Update: async (req, res) => {
//         const id = req.params.id;

//         try {
//             const noticia = await NoticiasModel.Update(id, req.body);

//             if(noticia.rowCount === 0) {
//                 res.status(404).json({ message: `Notícia ${id} não encontrado - Control` });
//             } else {
//                 res.json({ message: "Notícia atualizado com sucesso Control" });
//             }
//         } catch (erro) {
//             res.status(500).json({ erro: "Erro ao atualizar notícia Control" })
//         }
//     },
//     ListarPorId: async (req, res) => {
//         const id = req.params.id;

//         try {
//             const noticia = await NoticiasModel.ListarPorID(id);
//             res.send(noticia);
//         } catch (erro) {
//             res.status(400).json({ erro: "Erro ao Listar o notícia por Id - Control" });
//         }
//     },
//     Delete: async (req, res) => {
//         const id = req.params.id;

//         try {
//             const noticia = await NoticiasModel.ListarPorID(id);
//             console.log(noticia)

//             if (!noticia || !noticia.TITULO) {
//                 return res.status(404).json({ erro: "noticia não encontrado ou nome não disponível." });
//             }

//             const diretorioImagens = path.resolve(__dirname, '../public/images/noticias');

//             const caminhoImagem = path.join(diretorioImagens, `${noticia.TITULO}.png`);

//             if (fs.existsSync(caminhoImagem)) {
//                 await fs.promises.unlink(caminhoImagem);
//                 console.log(`Imagem ${noticia.TITULO}.png deletada com sucesso.`);
//             } else {
//                 console.log("Imagem não encontrada, prosseguindo com a exclusão do registro.");
//             }


//             const imovel = await NoticiasModel.Delete(id);

//             if (imovel.rowCount === 0) {
//                 res.status(404).json({ message: `Notícia ${id} não encontrado` });
//             } else {
//                 res.status(200).json({ message: "Notícia deletado com sucesso - Control" });
//             }
//         } catch (erro) {
//             res.status(400).json({ erro: "Erro ao deletar usuário" });
//         }
//     }
// }

// module.exports = ControlNoticias;*/

const Noticia = require('../models/noticias');

// Exemplo de uso no controller
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
    deletar
};