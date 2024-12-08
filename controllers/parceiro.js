const ParceiroModel = require("../models/parceiro");
const path = require('path');
const fs = require('fs');

const ControlParceiro = {
    listar: async (req, res) => {
        try {
            const parceiro = await ParceiroModel.Listar();
            res.json(parceiro);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar parceiros Controler" });
        }
    },
    ListarPorId: async (req, res) => {
        try {
            const parceiro = await ParceiroModel.ListarPorID(req.params.id);
            res.json(parceiro);
        } catch (erro) { res.status(400).json({ erro: "Erro ao listar parceiro Controler" }) }
    }
    ,
    Inserir: async (req, res) => {
        try {
            if (!req.files || !req.files.imagem) {
                return res.status(400).json({ erro: "Imagem não enviada." });
            }
            const imagem = req.files.imagem;
            imagem.name = `${req.body.nome}.png`;

            const diretorioImagens = path.resolve(__dirname, '../public/images/parceiros');
            const uploadImagem = path.join(diretorioImagens, imagem.name);
            
            await imagem.mv(uploadImagem);

            
            const parceiro = await ParceiroModel.Inserir(req.body);
            res.json(parceiro);
        } catch (erro) { res.status(400).json({ erro: "Erro ao inserir parceiro Controler" }) }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const resultado = await ParceiroModel.Update(id, req.body);
            if (resultado.affectedRows > 0) {
                res.json({ message: `Parceiro com ID ${id} atualizado com sucesso` });
            } else {
                res.status(404).json({ message: `Parceiro com ID ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(500).json({ error: 'Erro ao atualizar parceiro Controler' });
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;
        try {

            const parceiro = await ParceiroModel.ListarPorID(id);

    
            if (!parceiro || !parceiro[0].NOME) {
                return res.status(404).json({ erro: "parceiro não encontrado ou nome não disponível." });
            }
    
            const diretorioImagens = path.resolve(__dirname, '../public/images/parceiros');
    
            const caminhoImagem = path.join(diretorioImagens, `${parceiro[0].NOME}.png`);
    
            if (fs.existsSync(caminhoImagem)) {
                await fs.promises.unlink(caminhoImagem);
                console.log(`Imagem ${parceiro[0].NOME}.png deletada com sucesso.`);
            } else {
                console.log("Imagem não encontrada, prosseguindo com a exclusão do registro.");
            }

            const resultado = await ParceiroModel.Delete(id);
            if (resultado.affectedRows > 0) {
                res.status(200).json({ message: `Parceiro com ID ${id} excluído com sucesso.` });
            } else {
                res.status(404).json({ message: "Parceiro não encontrado." });
            }
        } catch (erro) { res.status(500).json({ erro: "Erro ao inserir parceiro Controler" }) }
    }
}

module.exports = ControlParceiro;