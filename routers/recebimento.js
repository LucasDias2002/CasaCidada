const router = require("express").Router();
const recebimento = require("../controllers/recebimento");

router.get('/',recebimento.Listar);
router.get('/relatorio',recebimento.ListarUltimo2anos);
router.get("/:id", recebimento.ListarPorId);
router.post('/', recebimento.Inserir);
router.delete('/:id', recebimento.Delete);

module.exports = router;