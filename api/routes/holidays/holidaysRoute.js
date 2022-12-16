const { Router } = require("express");
const {
  createHoliday,
  getAllHoliday,
  getHoliday,
  updateHolidayController,
  deleteHolidayController,
} = require("../../controllers/holidays/holidayController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/", validateAccesToken, getAllHoliday);
router.get("/:id", validateAccesToken, getHoliday);
router.put("/:id", validateAccesToken, updateHolidayController);
router.post("/", validateAccesToken, createHoliday);
router.delete("/:id", validateAccesToken, deleteHolidayController);

module.exports = router;
