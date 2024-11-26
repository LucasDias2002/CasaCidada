const jwt = require('jsonwebtoken');

const SECRET = "lucasepedro";

const VerifyToken = (req, res, next) => {
    const token = req.cookies.userToken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        req.user = decoded; // Adiciona o usuário decodificado no objeto req
        next();
    });
};

module.exports = {VerifyToken};