const { Router } = require("express");
const {
  createNoteExpedienteController,
  getAllNoteExpedienteController,
  updateNoteExpedienteController,
  readNoteExpedienteController,
  deleteNoteExpedienteController,
} = require("../../controllers/expedientes/noteExpedienteController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllNoteExpedienteController);
router.get("/:id", validateAccesToken, readNoteExpedienteController);
router.post("/",validateAccesToken, createNoteExpedienteController);
router.put("/:id", validateAccesToken, updateNoteExpedienteController);
router.delete("/:id", validateAccesToken, deleteNoteExpedienteController);

module.exports = router;
