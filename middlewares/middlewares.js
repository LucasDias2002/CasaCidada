const jwt = require('jsonwebtoken');
require("dotenv").config();

const SECRET = process.env.SECRET;

const VerifyToken = (req, res, next) => {
    const token = req.cookies.userToken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        if(decoded.permissao != 1 && decoded.permissao != 2){
            return res.status(403).json({message: "Acesso negado. Permissão insuficiente!"})
        }

        req.user = decoded; // Adiciona o usuário decodificado no objeto req
        next();
    });
};

module.exports = {VerifyToken};