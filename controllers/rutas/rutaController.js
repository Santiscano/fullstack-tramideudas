const {
  createRutaServices,
  getAllRutaServices,
  updateRutaServices,
  readRutaServices,
  deleteRutaServices,
} = require("../../services/rutas/rutaServices");

const createRutaController = async (req, res) => {
  try {
    const data = await createRutaServices(req.body);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const updateRutaController = async (req, res) => {
  try {
    console.log(req.params);
    const data = await updateRutaServices(req.params, req.body);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};
const readRutaController = async (req, res) => {
  try {
    const data = await readRutaServices(req.params);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

const getAllRutaController = async (req, res) => {
  try {
    const data = await getAllRutaServices();
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const deleteRutaController = async (req, res) => {
  try {
    const data = await deleteRutaServices(req.params);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createRutaController,
  readRutaController,
  getAllRutaController,
  updateRutaController,
  deleteRutaController,
};
