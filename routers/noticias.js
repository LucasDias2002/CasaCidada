const router = require("express").Router();
const noticia = require("../controllers/noticias");

router.get('/',noticia.Listar);
router.get("/:id", noticia.ListarPorId);
router.post('/', noticia.Inserir);
router.put('/:id', noticia.Update);
router.delete('/:id', noticia.Delete);

module.exports = router;