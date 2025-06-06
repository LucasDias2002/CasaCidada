const { sequelize } = require("../database/conexaoPostgre");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

async function login(req, res) {

    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const [user] = await sequelize.query(`SELECT * FROM USUARIO WHERE email = :email`,
            {
                replacements: {email},
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: "Senha incorreta!" });
        }

        const token = jwt.sign({ id: user.id, permissao: user.permissao }, SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login bem sucedido", data: { "token": token } });


    } catch (erro) {
        console.error(erro);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
}

module.exports = { login }
