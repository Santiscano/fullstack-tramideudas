const {
  createFichasServices,
  getAllFichasServices,
  updateFichasServices,
  readFichasServices,
  deleteFichasServices,
} = require("../../services/fichas/fichasServices");

const createFichasController = async (req, res) => {
  try {
    const data = await createFichasServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const updateFichasController = async (req, res) => {
  try {
    const data = await updateFichasServices(req.params, req.body);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const readFichasController = async (req, res) => {
  try {
    const data = await readFichasServices(req);
    return res.status(200).json( data );
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllFichasController = async (req, res) => {
  try {
    const data = await getAllFichasServices();
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
  updateFichasController,
  deleteFichasController,
};
