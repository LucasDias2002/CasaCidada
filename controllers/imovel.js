const ImovelModel = require('../models/imovel');

async function Listar(req, res) {
    try {
        const imovel = await ImovelModel.Listar();
        res.send(imovel);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar Imovel Control" });
    }
}

async function ListarDisponiveis(req, res) {
    try {
        const imovel = await ImovelModel.ListarDisponiveis();
        res.send(imovel);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar Imovel disponivel Control" });
    }
}

async function ListarPorId(req, res) {
    const id = req.params.id;

    try {
        const imovel = await ImovelModel.ListarPorID(id);
        res.send(imovel);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Listar o imovel por Id Control" });
    }
}

async function Inserir(req, res) {
    try {
        const imovel = await ImovelModel.Inserir(req.body);
        res.json(imovel);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao Inserir imovel Control" });
    }
}

async function Update(req, res) {
    const id = req.params.id;

    try {
        const imovel = await ImovelModel.Update(id, req.body);

        if (imovel.rowCount === 0) {
            res.status(404).json({ message: `Imovel ${id} não encontrado Control` });
        } else {
            res.json({ message: "imovel atualizado com sucesso Control" });
        }
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar imovel Control" })
    }
}

async function UpdateDisponibilidade(req, res) {
    const id = req.params.id;
    console.log(id + "Esta certo?")

    try {
        const imovel = await ImovelModel.UpdateDisponibilidade(id);

        if (imovel.rowCount === 0) {
            res.status(404).json({ message: `Imovel ${id} não encontrado Control` });
        } else {
            res.json({ message: "Disponibilidade de imovel atualizado com sucesso Control" });
        }
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar disponibilidade de imovel  Control" })
    }
}

async function Delete(req, res) {
    const id = req.params.id;
    try {
        const imovel = await ImovelModel.Delete(id);

        if (imovel.rowCount === 0) {
            res.status(404).json({ message: `Imovel ${id} não encontrado` });
        } else {
            res.status(200).json({ message: "Imovel deletado com sucesso Control" });
        }
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao deletar imovel Control" });
    }
}

module.exports = {
    Listar,
    ListarDisponiveis,
    ListarPorId,
    Inserir,
    Update,
    UpdateDisponibilidade,
    Delete
}

/*
const ControlImovel = {
    Listar: async (req, res) => {
        try {
            const imovel = await ImovelModel.Listar();
            res.send(imovel);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar Imovel Control" });
        }
    },
    ListarDisponiveis: async (req, res) => {
        try {
            const imovel = await ImovelModel.ListarDisponiveis();
            res.send(imovel);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao listar Imovel disponivel Control" });
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
    UpdateDisponibilidade: async (req, res) => {
        const id = req.params.id;
        console.log(id + "Esta certo?")

        try {
            const imovel = await ImovelModel.UpdateDisponibilidade(id);

            if(imovel.affectedRows > 0) {
                res.json({ message: "Disponibilidade de imovel atualizado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Imovel ${id} não encontrado Control` });
            }
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar disponibilidade de imovel  Control" })
        }
    },
    Delete: async (req, res) => {
        const id = req.params.id;

        try {
            const imovel = await ImovelModel.Delete(id);

            if (imovel.affectedRows > 0) {
                res.status(200).json({ message: "Imovel deletado com sucesso Control" });
            } else {
                res.status(404).json({ message: `Imovel ${id} não encontrado` });
            }
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao deletar imovel Control" });
        }
    }
}

module.exports = ControlImovel;*/