const { Router } = require("express");
const {
  createDocumentosController,
  downloadDocumentosController,
  GetUrlAmazonS3Controller,
} = require("../../controllers/documentos/documentoController");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();

router.get("/:id", validateAccesToken, downloadDocumentosController);
router.post("/", validateAccesToken, createDocumentosController);
router.get("/downloadamazon/:id", validateAccesToken, GetUrlAmazonS3Controller);

module.exports = router;
