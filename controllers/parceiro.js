const ParceiroModel = require("../models/parceiro");
const path = require('path');
const fs = require('fs');

async function Listar(req, res) {
    try {
        const parceiro = await ParceiroModel.Listar();
        res.json(parceiro);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar parceiros Controler" });
    }
}

async function ListarPorId(req, res) {
    try {
        const parceiro = await ParceiroModel.ListarPorID(req.params.id);
        res.json(parceiro);
    } catch (erro) { res.status(400).json({ erro: "Erro ao listar parceiro Controler" }) }
}

async function Inserir(req, res) {
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
}

async function Update(req, res) {
    try {
        const id = req.params.id;
        const resultado = await ParceiroModel.Update(id, req.body);
        if (resultado.rowCount === 0) {
            res.status(404).json({ message: `Parceiro com ID ${id} não encontrado` });
        } else {
            res.json({ message: `Parceiro com ID ${id} atualizado com sucesso` });
        }
    } catch (erro) {
        res.status(500).json({ error: 'Erro ao atualizar parceiro Controler' });
    }
}

async function Delete(req, res) {
    const id = req.params.id;
    try {

        const parceiro = await ParceiroModel.ListarPorID(id);


        if (!parceiro || !parceiro.nome) {
            return res.status(404).json({ erro: "parceiro não encontrado ou nome não disponível." });
        }

        const diretorioImagens = path.resolve(__dirname, '../public/images/parceiros');

        const caminhoImagem = path.join(diretorioImagens, `${parceiro.nome}.png`);

        if (fs.existsSync(caminhoImagem)) {
            await fs.promises.unlink(caminhoImagem);
            console.log(`Imagem ${parceiro.nome}.png deletada com sucesso.`);
        } else {
            console.log("Imagem não encontrada, prosseguindo com a exclusão do registro.");
        }

        const resultado = await ParceiroModel.Delete(id);
        if (resultado.rowCount === 0) {
            res.status(404).json({ message: "Parceiro não encontrado." });
        } else {
            res.status(200).json({ message: `Parceiro com ID ${id} excluído com sucesso.` });
        }
    } catch (erro) { res.status(500).json({ erro: "Erro ao inserir parceiro Controler" }) }
}


module.exports = {Listar, ListarPorId, Update, Inserir, Delete};