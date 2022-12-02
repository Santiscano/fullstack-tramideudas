const { Router } = require("express");
const {
  createNoteClientController,
  getAllNoteClientController,
  updateNoteClientController,
  readNoteClientController,
  deleteNoteClientController,
} = require("../../controllers/clients/noteClientController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllNoteClientController);
router.get("/:id", validateAccesToken, readNoteClientController);
router.post("/",validateAccesToken, createNoteClientController);
router.put("/:id", validateAccesToken, updateNoteClientController);
router.delete("/:id", validateAccesToken, deleteNoteClientController);

module.exports = router;