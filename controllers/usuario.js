const UsuarioModel = require("../models/usuario");

const ControlUsuario = {
    listar: async (req, res) => {
        try {
            const usuarios = await UsuarioModel.listar();
            res.json(usuarios);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar usuários Controler" });
        }
    },
    ListarPorId: async (req, res) => {
        try {
            const usuario = await UsuarioModel.listarPorId(req.params.id);
            res.json(usuario);
        } catch (erro) { res.status(400).json({ erro: "Erro ao listar usuário Controler" }) }
    }
    ,
    Inserir: async (req, res) => {
        try {
            const usuario = await UsuarioModel.Inserir(req.body);
            res.json(usuario);
        } catch (erro) { res.status(400).json({ erro: "Erro ao inserir usuário Controler" }) }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const resultado = await UsuarioModel.Update(id, req.body);
            if (resultado.affectedRows > 0) {
                res.json({ message: `Usuário com ID ${id} atualizado com sucesso` });
              } else {
                res.status(404).json({ message: `Usuário com ID ${id} não encontrado` });
              }
            } catch (erro) {
              res.status(500).json({ error: 'Erro ao atualizar usuário Controler' });
            }
    },
    Delete: async (req, res) => {
        const id = req.params.id;
        try {
            const resultado = await UsuarioModel.Delete(id);
            if(resultado.affectedRows > 0){
                res.status(200).json({ message: `Usuário com ID ${id} excluído com sucesso.` });
            } else {
                res.status(404).json({ message: "Usuário não encontrado." });
            }
        } catch (erro) { res.status(400).json({ erro: "Erro ao inserir usuário Controler" }) }
    }
}

module.exports = ControlUsuario;