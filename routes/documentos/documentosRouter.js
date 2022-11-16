const { Router } = require("express");
const { createDocumentosController,downloadDocumentosController } = require("../../controllers/documentos/documentoController");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();

// router.get("/", validateAccesToken, getAllAgentController);

router.get("/:id", validateAccesToken, downloadDocumentosController);
router.post("/",validateAccesToken, createDocumentosController);
// router.put("/:id", validateAccesToken, updateAgentController);
// router.put("/", validateAccesToken, updatePasswordController);

// router.delete("/:id", validateAccesToken, deleteAgentController);

module.exports = router;