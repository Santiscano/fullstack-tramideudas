const { Router } = require("express");
const {
  createNoteExpedienteController,
  getAllNoteExpedienteController,
  readNoteExpedienteController,
} = require("../../controllers/expedientes/noteExpedienteController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllNoteExpedienteController);
router.get("/:id", validateAccesToken, readNoteExpedienteController);
router.post("/",validateAccesToken, createNoteExpedienteController);

module.exports = router;
