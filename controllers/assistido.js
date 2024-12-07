const AssistidoModel = require('../models/assistido');

const ControlAssistido = {
    Listar: async (req, res)=>{
        try{
            const assistido = await AssistidoModel.Listar();
            res.send(assistido);
        }catch (erro){
            res.status(500).json({erro: 'Erro ao listar assisitido Control'});
        }
    },
    ListarPorID: async (req, res)=>{
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

            if(assistido.affectedRows > 0) {
                res.json({ message: "Assistido atualizado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Assistido ${id} não encontrado Control` });
            }
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar assistido Control" })
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const assistido = await AssistidoModel.Delete(id);

            if (assistido.affectedRows > 0) {
                res.status(200).json({ message: "Assistido deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Assistido ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar Assistido" });
        }
    }
}

module.exports = ControlAssistido;