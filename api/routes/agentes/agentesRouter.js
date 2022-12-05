const { Router } = require("express");
const {
  createAgentController,
  getAllAgentController,
  updateAgentController,
  readAgentController,
  deleteAgentController,
  updatePasswordController,
} = require("../../controllers/agentes/agenteController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/", validateAccesToken, getAllAgentController);
router.get("/:id", validateAccesToken, readAgentController);

router.post("/",validateAccesToken, createAgentController);
router.put("/:id", validateAccesToken, updateAgentController);
router.put("/", validateAccesToken, updatePasswordController);

router.delete("/:id", validateAccesToken, deleteAgentController);

module.exports = router;