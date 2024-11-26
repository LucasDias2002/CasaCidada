const express = require("express");
const router = express.Router();
const { VerifyToken } = require('../middlewares/middlewares');

router.get('/protected', VerifyToken, (req, res) => {
    res.json({ message: 'Acesso autorizado', user: req.user });
});

module.exports = router;