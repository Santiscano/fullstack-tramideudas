const { Router } = require("express");
const {
  createAgentController,
  getAllAgentController,
  updateAgentController,
  readAgentController,
  deleteAgentController,
  updatePasswordController,
} = require("../../controllers/agentes/agentesController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/", validateAccesToken, getAllAgentController);
router.get("/:id", validateAccesToken, readAgentController);

router.post("/", createAgentController);
router.put("/:id", validateAccesToken, updateAgentController);
router.put("/", updatePasswordController);

router.delete("/:id", validateAccesToken, deleteAgentController);

module.exports = router;
