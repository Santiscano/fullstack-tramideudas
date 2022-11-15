const { Router } = require("express");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const {
  createFichasController,
  getAllFichasController,
 updateFichajeJustificationsController,
  readFichasController,
  deleteFichasController,
} = require("../../controllers/fichajes/fichajeController");

const router = Router();

router.get("/", validateAccesToken, getAllFichasController);
router.get("/:id/:page/:limit", validateAccesToken, readFichasController);

router.post("/", validateAccesToken, createFichasController);
router.put("/:id", validateAccesToken, updateFichajeJustificationsController);

router.delete("/:id", validateAccesToken, deleteFichasController);

module.exports = router;
