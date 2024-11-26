const router = require("express").Router();
const usuario = require("../controllers/usuario");

router.get('/',usuario.listar);
router.get("/:id", usuario.ListarPorId);
router.post('/', usuario.Inserir);
router.put('/:id', usuario.Update);
router.delete('/:id', usuario.Delete);

module.exports = router;