const router = require("express").Router();
const gasto = require("../controllers/gasto");

router.get('/',gasto.Listar);
router.get("/:id", gasto.ListarPorId);
router.post('/', gasto.Inserir);
router.delete('/:id', gasto.Delete);

module.exports = router;