const { findUser } = require("../models/authModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const SECRET = "lucasepedro";

const login = async (req, res) => {
    const { email, senha } = req.body;
    try{
        const [user] = await findUser(email);

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        const senhaValida = await bcrypt.compare(senha, user.SENHA);
        if(!senhaValida){
            return res.status(401).json({message: "Senha incorreta!"});
        }

        const token = jwt.sign({id: user.ID}, SECRET, {expiresIn: '1h'});

        return res.status(200).json({message: "Login bem sucedido", data: {"token": token}});


    }catch(erro){
        console.error(erro);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
}

module.exports = { login };
