const { Router } = require("express");
const {
  createPaymentsController,
  updatePaymentsController,
  readPaymentsController,
} = require("../../controllers/payments/PaymentController");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const router = Router();

router.post("/", validateAccesToken, createPaymentsController);
router.get("/:id", validateAccesToken, readPaymentsController);
router.put("/:id", validateAccesToken, updatePaymentsController);

module.exports = router;
