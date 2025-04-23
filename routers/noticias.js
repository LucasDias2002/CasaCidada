// const router = require("express").Router();
// const noticia = require("../controllers/noticias");

// router.get('/',noticia.Listar);
// router.get("/:id", noticia.ListarPorId);
// router.post('/', noticia.Inserir);
// router.put('/:id', noticia.Update);
// router.delete('/:id', noticia.Delete);

// module.exports = router;

const router = require("express").Router();
const noticiaController = require("../controllers/noticias");
const multer = require('multer');
const { VerifyToken } = require("../middlewares/middlewares");

const fs = require('fs');
const path = require('path');

const uploadDirectory = path.join(__dirname, '../uploads'); // Caminho para a pasta uploads

// Verifica se o diretório existe
if (!fs.existsSync(uploadDirectory)) {
    // Se não existir, cria a pasta
    fs.mkdirSync(uploadDirectory);
}


const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, 'uploads/'),
    filename :(req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({storage});

router.get("/", noticiaController.listarNoticias);

router.post(
  "/",
  VerifyToken,
  upload.single("imagem"),
  noticiaController.criarNoticia
);
router.delete('/:id', noticiaController.deletar)
module.exports = router;

