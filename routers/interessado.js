const router = require("express").Router();
const interessado = require("../controllers/interessado");

router.get('/',interessado.Listar);
router.post('/', interessado.Inserir);

module.exports = router;