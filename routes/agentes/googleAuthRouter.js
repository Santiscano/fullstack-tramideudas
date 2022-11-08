const { Router, request } = require("express");
const {authLoginController,authLogoutController,authGetTokenController,authSaveTokenController,authSendMailController} = require("../../controllers/agentes/googleAuthController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

// login
router.post("/login", authLoginController);
// logout
 router.get("/logout",validateAccesToken, authLogoutController);
// manda url para permisos de gmail
router.get("/",validateAccesToken, authGetTokenController);
// valida el token y lo guarda en la DB
router.get("/gettoken", validateAccesToken,authSaveTokenController);
// endpoint para enviar mail
router.post("/sendmail/:id", authSendMailController);

module.exports = router;
