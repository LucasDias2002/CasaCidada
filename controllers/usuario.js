const UsuarioModel = require("../models/usuario");
const bcrypt = require('bcrypt'); // Para criptografar senhas

const listar = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuário Controler' });
    }
}

const ListarPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await UsuarioModel.findByPk(id);
        res.json(usuario);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao listar usuário por id Controler" })
    }
}

const Inserir = async (req, res) => {
    const senhaHash = await bcrypt.hash(req.body.senha, 8);
    try {
        const novoUsuario = await Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: senhaHash,
            telefone: req.body.telefone || '',
            data_nasc: req.body.data_nasc,
            permissao: 3,
        });
        res.status(201).json(novoUsuario);
    } catch (erro) { res.status(400).json({ erro: "Erro ao inserir usuário Controler" }) }
}

const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const [resultado] = await UsuarioModel.update(req.body, {
            where: { id }
        });
        if (resultado.affectedRows > 0) {
            res.status(200).json({ message: `Usuário com ID ${id} atualizado com sucesso` });
        } else {
            res.status(404).json({ message: `Usuário com ID ${id} não encontrado` });
        }
    } catch (erro) {
        res.status(500).json({ error: 'Erro ao atualizar usuário Controler' });
    }
}

const Delete = async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await UsuarioModel.destroy({
            where: { id }
        });
        if (resultado.affectedRows > 0) {
            res.status(200).json({ message: `Usuário com ID ${id} excluído com sucesso.` });
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        }
    } catch (erro) { res.status(400).json({ erro: "Erro ao inserir usuário Controler" }) }
}

module.exports = {
    listar,
    ListarPorId,
    Inserir,
    Update,
    Delete
}