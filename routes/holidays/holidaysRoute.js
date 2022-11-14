const { Router } = require("express");
const {
  createHoliday,
  getAllHoliday,
  getHoliday,
} = require("../../controllers/holidays/holidayController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/", validateAccesToken, getAllHoliday);
router.get("/:id", validateAccesToken, getHoliday);
router.post("/", validateAccesToken, createHoliday);

module.exports = router;
