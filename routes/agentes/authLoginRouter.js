const { Router } = require("express");
const authLoginController = require("../../controllers/agentes/authController");

const router = Router();

router.post("/login", authLoginController);

module.exports = router;
