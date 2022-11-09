const {
  createRoleServices,
  getAllRoleServices,
  updateRoleServices,
  readRoleServices,
  deleteRoleServices,
} = require("../../services/roles/roleServices");

const createRoleController = async (req, res) => {
  try {
    const data = await createRoleServices(req.body);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const updateRoleController = async (req, res) => {
  try {
    console.log(req.params);
    const data = await updateRoleServices(req.params, req.body);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const readRoleController = async (req, res) => {
  try {
    const data = await readRoleServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const getAllRoleController = async (req, res) => {
  try {
    const data = await getAllRoleServices();
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const deleteRoleController = async (req, res) => {
  try {
    const data = await deleteRoleServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createRoleController,
  readRoleController,
  getAllRoleController,
  updateRoleController,
  deleteRoleController,
};
