const { Router } = require("express");
const {
  createNoteExpedienteController,
  getAllNoteExpedienteController,
  updateNoteExpedienteController,
  readNoteExpedienteController,
} = require("../../controllers/expedientes/noteExpedienteController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllNoteExpedienteController);
router.get("/:id", validateAccesToken, readNoteExpedienteController);
router.post("/",validateAccesToken, createNoteExpedienteController);
router.put("/:id", validateAccesToken, updateNoteExpedienteController);

module.exports = router;
