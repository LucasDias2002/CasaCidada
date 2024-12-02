const router = require("express").Router();
const noticia = require("../controllers/noticias");

router.get('/',noticia.Listar);
router.post('/', noticia.Inserir);

module.exports = router;