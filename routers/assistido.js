const router = require('express').Router();
const assistido = require('../controllers/assistido');

router.get('/', assistido.Listar);
router.get('/:id', assistido.ListarPorID);
router.post('/', assistido.Inserir);
router.put('/:id', assistido.Update);
router.delete('/:id', assistido.Delete);

module.exports = router;