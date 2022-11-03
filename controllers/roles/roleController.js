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
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const updateRoleController = async (req, res) => {
  try {
    console.log(req.params);
    const data = await updateRoleServices(req.params, req.body);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};
const readRoleController = async (req, res) => {
  try {
    const data = await readRoleServices(req.params);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

const getAllRoleController = async (req, res) => {
  try {
    const data = await getAllRoleServices();
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const deleteRoleController = async (req, res) => {
  try {
    const data = await deleteRoleServices(req.params);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createRoleController,
  readRoleController,
  getAllRoleController,
  updateRoleController,
  deleteRoleController,
};
