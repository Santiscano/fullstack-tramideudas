const { Router } = require("express");
const {
  authLoginController,
  authLogoutController,
} = require("../../controllers/agentes/authController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

// login
router.post("/login", authLoginController);
// logout
router.get("/logout", validateAccesToken, authLogoutController);

module.exports = router;
