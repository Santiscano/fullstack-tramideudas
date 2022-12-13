const { Router } = require("express");
const {
  updatePrevisionPagoController,
  updateOnePrevisionPagoController,
  readPrevisionPagoController,
} = require("../../controllers/expedientes/previsionPagoController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:id", validateAccesToken, readPrevisionPagoController);
router.put("/:id", validateAccesToken, updateOnePrevisionPagoController);
router.put("/:id/:init/:newdate", validateAccesToken, updatePrevisionPagoController);

module.exports = router;
