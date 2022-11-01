const { Router } = require("express");
const {
  createAgentController,
  getAllAgentController,
  updateAgentController,
  readAgentController,
  deleteAgentController,
} = require("../../controllers/agentes/agentesController");

const router = Router();

router.get("/", getAllAgentController);
router.get("/:id", readAgentController);
router.post("/", createAgentController);
router.put("/:id", updateAgentController);
router.delete("/:id", deleteAgentController);

module.exports = router;
