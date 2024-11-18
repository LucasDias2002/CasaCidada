const ParceiroModel = require("../models/parceiro");

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
            const resultado = await ParceiroModel.Delete(id);
            if(resultado.affectedRows > 0){
                res.status(200).json({ message: `Parceiro com ID ${id} excluído com sucesso.` });
            } else {
                res.status(404).json({ message: "Parceiro não encontrado." });
            }
        } catch (erro) { res.status(400).json({ erro: "Erro ao inserir parceiro Controler" }) }
    }
}

module.exports = ControlParceiro;