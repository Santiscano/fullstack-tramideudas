const {
  createProductServices,
  getAllProductServices,
  updateProductServices,
  readProductServices,
  deleteProductServices,
} = require("../../services/products/productsServices");

const createProductController = async (req, res) => {
  try {
    const data = await createProductServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const data = await updateProductServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const readProductController = async (req, res) => {
  try {
    const data = await readProductServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const data = await getAllProductServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const data = await deleteProductServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  updateProductController,
  readProductController,
  deleteProductController,
};
