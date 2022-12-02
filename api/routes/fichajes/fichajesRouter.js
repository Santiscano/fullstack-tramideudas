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

router.get("/:id", validateAccesToken, readFichasController);
router.get("/:id/:page/:limit", validateAccesToken, getAllFichasController,
);

router.post("/", validateAccesToken, createFichasController);
router.put("/:id", validateAccesToken, updateFichajeJustificationsController);

router.delete("/:id", validateAccesToken, deleteFichasController);

module.exports = router;
