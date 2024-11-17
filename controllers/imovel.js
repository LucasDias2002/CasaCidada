const ImovelModel = require('../models/imovel');

const ControlImovel = {
    Listar: async (req, res) => {
        try {
            const imovel = await ImovelModel.Listar();
            res.send(imovel);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar Imovel Control" });
        }
    },
    ListarPorId: async (req, res) => {
        const id = req.params.id;

        try {
            const imovel = await ImovelModel.ListarPorID(id);
            res.send(imovel);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Listar o imovel por Id Control" });
        }
    },
    Inserir: async (req, res) => {
        try {
            const imovel = await ImovelModel.Inserir(req.body);
            res.json(imovel);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao Inserir imovel Control" });
        }
    },
    Update: async (req, res) => {
        const id = req.params.id;

        try {
            const imovel = await ImovelModel.Update(id, req.body);

            if(imovel.affectedRows > 0) {
                res.json({ message: "imovel atualizado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Imovel ${id} não encontrado Control` });
            }
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar imovel Control" })
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const imovel = await ImovelModel.Delete(id);

            if (imovel.affectedRows > 0) {
                res.status(200).json({ message: "Imovel deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `imovel ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar usuário" });
        }
    }
}

module.exports = ControlImovel;