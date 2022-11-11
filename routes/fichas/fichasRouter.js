const { Router } = require("express");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const {
  createFichasController,
  getAllFichasController,
  updateFichasController,
  readFichasController,
  deleteFichasController,
} = require("../../controllers/fichas/fichaController");

const router = Router();

router.get("/", validateAccesToken, getAllFichasController);
router.get("/:id/:page/:limit", validateAccesToken, readFichasController);

router.post("/", validateAccesToken, createFichasController);
router.put("/:id", validateAccesToken, updateFichasController);

router.delete("/:id", validateAccesToken, deleteFichasController);

module.exports = router;
