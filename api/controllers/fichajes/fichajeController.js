const {
  createFichasServices,
  getAllFichasServices,
  updateFichajeJustificationsServices,
  readFichasServices,
  deleteFichasServices,
} = require("../../services/fichajes/fichajesServices");

const createFichasController = async (req, res) => {
  try {
    const data = await createFichasServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const updateFichajeJustificationsController = async (req, res) => {
  try {
    const data = await updateFichajeJustificationsServices(
      req.params,
      req.body
    );
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const readFichasController = async (req, res) => {
  try {
    const data = await readFichasServices();
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllFichasController = async (req, res) => {
  try {
    const data = await getAllFichasServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const deleteFichasController = async (req, res) => {
  try {
    const data = await deleteFichasServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createFichasController,
  readFichasController,
  getAllFichasController,
  updateFichajeJustificationsController,
  deleteFichasController,
};
