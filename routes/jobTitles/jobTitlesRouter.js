const { Router } = require("express");
const validateAccesToken = require("../../middlewares/validateAccessToken");
const {
  createJobTitleController,
  getAllJobTitleController,
  updateJobTitleController,
  readJobTitleController,
  deleteJobTitleController,
} = require("../../controllers/jobTitles/jobTitleController");

const router = Router();

router.get("/", validateAccesToken, getAllJobTitleController);
router.get("/:id", validateAccesToken, readJobTitleController);

router.post("/", validateAccesToken, createJobTitleController);
router.put("/:id", validateAccesToken, updateJobTitleController);

router.delete("/:id", validateAccesToken, deleteJobTitleController);

module.exports = router;
