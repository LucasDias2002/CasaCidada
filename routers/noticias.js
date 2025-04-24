const router = require("express").Router();
const noticiaController = require("../controllers/noticias");
const multer = require('multer');
const { VerifyToken } = require("../middlewares/middlewares");
const { storage } = require('../services/cloudinary');
const upload = multer({storage})

router.get("/", noticiaController.listarNoticias);

router.get("/:id", noticiaController.listarNoticiasPorId);

router.post(
  "/",
  VerifyToken,
  upload.single("imagem"),
  noticiaController.criarNoticia
);
router.delete('/:id', noticiaController.deletar)
module.exports = router;

