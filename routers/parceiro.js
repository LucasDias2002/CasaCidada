const router = require("express").Router();
const parceiroController = require("../controllers/parceiro");
const multer = require('multer');
const { storage } = require('../service/cloudinary');
const upload = multer({storage})

router.get("/",parceiroController.listarParceiros);
//router.get("/:id", parceiroController.ListarPorId);
router.post(
    "/",
    upload.single("imagem"),
    parceiroController.criarParceiro);
//router.put("/:id", parceiroController.Update);
//router.delete("/:id", parceiroController.Delete);

module.exports = router;