const { Router } = require("express");
const {
  createDocumentosController,
  downloadDocumentosController,
  downloadDocumentosAmazonController,
} = require("../../controllers/documentos/documentoController");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();

router.get("/:id", validateAccesToken, downloadDocumentosController);
router.post("/", validateAccesToken, createDocumentosController);
router.get("/downloadamazon/:id", validateAccesToken, downloadDocumentosAmazonController);

module.exports = router;
