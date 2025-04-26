const router = require("express").Router();
const depoimento = require("../controllers/depoimento");

router.get('/',depoimento.Listar);
router.get("/:id", depoimento.ListarPorId);
router.post('/', depoimento.Inserir);
router.delete('/:id', depoimento.Delete);

module.exports = router;