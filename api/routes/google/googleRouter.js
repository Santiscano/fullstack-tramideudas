const { Router, request } = require("express");
const {authenticateGoogleGmailController,saveTokenGoogleController,sendGmailController} = require("../../controllers/google/googleController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();


// manda url para permisos de gmail
router.get("/",validateAccesToken, authenticateGoogleGmailController);
// valida el token y lo guarda en la DB
router.get("/savetoken", validateAccesToken,saveTokenGoogleController);
// endpoint para enviar mail
router.post("/sendmail/:id",validateAccesToken,sendGmailController);

module.exports = router;