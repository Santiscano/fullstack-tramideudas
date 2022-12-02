const { Router } = require("express");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const {
  createRutaController,
  getAllRutaController,
  updateRutaController,
  readRutaController,
  deleteRutaController,
} = require("../../controllers/rutas/rutaController");

const router = Router();

router.get("/", validateAccesToken, getAllRutaController);
router.get("/:id",validateAccesToken, readRutaController);

router.post("/", validateAccesToken, createRutaController);
router.put("/:id", validateAccesToken, updateRutaController);

router.delete("/:id", validateAccesToken, deleteRutaController);

module.exports = router;
