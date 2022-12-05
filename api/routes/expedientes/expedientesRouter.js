const { Router } = require("express");
const {
  createExpedienteController,
  getAllExpedienteController,
  updateExpedienteController,
  readExpedienteController,
  deleteExpedienteController,
} = require("../../controllers/expedientes/expedienteController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllExpedienteController);
router.get("/:id", validateAccesToken, readExpedienteController);
router.post("/",validateAccesToken, createExpedienteController);
router.put("/:id", validateAccesToken, updateExpedienteController);
router.delete("/:id", validateAccesToken, deleteExpedienteController);

module.exports = router;
