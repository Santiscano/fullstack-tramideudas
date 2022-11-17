const { Router } = require("express");
const { createDocumentosController,downloadDocumentosController } = require("../../controllers/documentos/documentoController");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();


router.get("/:id", validateAccesToken, downloadDocumentosController);
router.post("/",validateAccesToken, createDocumentosController);
// router.put("/:id", validateAccesToken, updateAgentController);

module.exports = router;