const AssistidoModel = require('../models/assistido');
const path = require('path');
const fs = require('fs');

const ControlAssistido = {
    Listar: async (req, res) => {
        try {
            const assistido = await AssistidoModel.Listar();
            res.send(assistido);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao listar assisitido Control' });
        }
    },
    ListarPorID: async (req, res) => {
        const id = req.params.id;

        try {
            const assistido = await AssistidoModel.ListarPorID(id);
            res.send(assistido);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Listar o assistido por Id Control" });
        }
    },
    Inserir: async (req, res) => {
        try {
            if (!req.files || !req.files.imagem) {
                return res.status(400).json({ erro: "Imagem não enviada." });
            }
            const imagem = req.files.imagem;
            //console.log(req.body.imagem.nome);
            imagem.name = `${req.body.nome}.png`;

            const diretorioImagens = path.resolve(__dirname, '../public/images/fotosAssistidos');
            const uploadImagem = path.join(diretorioImagens, imagem.name);

            await imagem.mv(uploadImagem);

            const assistido = await AssistidoModel.Inserir(req.body);
            res.json(assistido);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Inserir assistido Control" });
        }
    },
    Update: async (req, res) => {
        const id = req.params.id;

        try {
            const assistido = await AssistidoModel.Update(id, req.body);

            if (assistido.affectedRows > 0) {
                res.json({ message: "Assistido atualizado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Assistido ${id} não encontrado Control` });
            }
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar assistido Control" })
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
    
            // Obtém os dados do assistido, incluindo o nome da imagem
            const assistido = await AssistidoModel.ListarPorID(id);
    
            if (!assistido || !assistido.NOME) {
                return res.status(404).json({ erro: "Assistido não encontrado ou nome não disponível." });
            }
    
            // Diretório onde as imagens estão armazenadas
            const diretorioImagens = path.resolve(__dirname, '../public/images/fotosAssistidos');
    
            // Caminho completo da imagem
            const caminhoImagem = path.join(diretorioImagens, `${assistido.NOME}.png`);
    
            // Excluir a imagem, se existir
            if (fs.existsSync(caminhoImagem)) {
                await fs.promises.unlink(caminhoImagem); // Usa versão baseada em promises
                console.log(`Imagem ${assistido.NOME}.png deletada com sucesso.`);
            } else {
                console.log("Imagem não encontrada, prosseguindo com a exclusão do registro.");
            }
    
            // Excluir o registro do assistido no banco de dados
            const resultado = await AssistidoModel.Delete(id);
    
            if (resultado.affectedRows > 0) {
                res.status(200).json({ message: "Assistido deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Assistido ${id} não encontrado` });
            }
        } catch (erro) {
            console.error("Erro ao deletar assistido: ", erro);
            res.status(500).json({ erro: "Erro ao deletar Assistido" });
        }
    }
}

module.exports = ControlAssistido;