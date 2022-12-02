const { Router } = require("express");
const {
  readHistoryChangeController,
  getAllHistoryChangeController,
} = require("../../controllers/clients/historyChangeController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/", validateAccesToken, getAllHistoryChangeController);
router.get("/:id", validateAccesToken, readHistoryChangeController);

module.exports = router;
