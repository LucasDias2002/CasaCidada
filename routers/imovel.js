const router = require("express").Router();
const imovel = require("../controllers/imovel");

router.get('/', imovel.Listar);
router.get('/disponiveis', imovel.ListarDisponiveis);
router.get("/:id", imovel.ListarPorId);
router.post('/', imovel.Inserir);
router.put('/:id', imovel.Update);
router.put('/atualizarStatus/:id', imovel.UpdateDisponibilidade);
router.delete('/:id', imovel.Delete);

module.exports = router;