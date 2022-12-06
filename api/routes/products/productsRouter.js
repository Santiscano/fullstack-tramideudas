const { Router } = require("express");
const {
  createProductController,
  getAllProductController,
  updateProductController,
  readProductController,
  deleteProductController,
} = require("../../controllers/products/productController");

const validateAccesToken = require("../../middlewares/validateAccessToken");

const router = Router();

router.get("/:page/:limit", validateAccesToken, getAllProductController);
router.get("/:id", validateAccesToken, readProductController);
router.post("/",validateAccesToken, createProductController);
router.put("/:id", validateAccesToken, updateProductController);
router.delete("/:id", validateAccesToken, deleteProductController);

module.exports = router;
