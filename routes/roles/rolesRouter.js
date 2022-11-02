const { Router } = require("express");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const {
  createRoleController,
  getAllRoleController,
  updateRoleController,
  readRoleController,
  deleteRoleController,
} = require("../../controllers/roles/roleController");

const router = Router();

router.get("/", validateAccesToken, getAllRoleController);
router.get("/:id", readRoleController);

router.post("/", validateAccesToken, createRoleController);
router.put("/:id", validateAccesToken,updateRoleController);

router.delete("/:id", validateAccesToken, deleteRoleController);

module.exports = router;