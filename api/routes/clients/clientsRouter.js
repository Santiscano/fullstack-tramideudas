const { Router } = require("express");
const {
  createClientController,
  getAllClientController,
  updateClientController,
  readClientController,
  deleteClientController,
} = require("../../controllers/clients/clientController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllClientController);
router.get("/:id", validateAccesToken, readClientController);
router.post("/",validateAccesToken, createClientController);
router.put("/:id", validateAccesToken, updateClientController);
router.delete("/:id", validateAccesToken, deleteClientController);

module.exports = router;
