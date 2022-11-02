const { Router } = require("express");
const {
  createAgentController,
  getAllAgentController,
  updateAgentController,
  readAgentController,
  deleteAgentController,
} = require("../../controllers/agentes/agentesController");
const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/", validateAccesToken, getAllAgentController);
router.get("/:id", readAgentController);

router.post("/", createAgentController);
router.put("/:id", updateAgentController);

router.delete("/:id", validateAccesToken, deleteAgentController);

module.exports = router;
