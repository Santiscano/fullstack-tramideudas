const { Router } = require("express");
const {
  createHistoryCallController,
} = require("../../controllers/calls/callController");
// const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();

router.post("/", createHistoryCallController);

module.exports = router;
