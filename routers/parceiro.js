const router = require("express").Router();
const parceiro = require("../controllers/parceiro");

router.get('/',parceiro.listar);
router.get("/:id", parceiro.ListarPorId);
router.post('/', parceiro.Inserir);
router.put('/:id', parceiro.Update);
router.delete('/:id', parceiro.Delete);

module.exports = router;