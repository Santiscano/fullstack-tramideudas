const { Router } = require("express");
const {
  createPaymentsController,
  readPaymentsController,
} = require("../../controllers/payments/PaymentController");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();

router.post("/", validateAccesToken, createPaymentsController);
router.get("/:id", validateAccesToken, readPaymentsController);

module.exports = router;
