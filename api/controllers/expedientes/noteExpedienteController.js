const {
  createNoteExpedientestServices,
  getAllNoteExpedientestServices,
  updateNoteExpedientestServices,
  readNoteExpedientestServices,
  deleteNoteExpedientestServices,
} = require("../../services/expedientes/NoteExpedientesServices");

const createNoteExpedienteController = async (req, res) => {
  try {
    const data = await createNoteExpedientestServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const updateNoteExpedienteController = async (req, res) => {
  try {
    const data = await updateNoteExpedientestServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const readNoteExpedienteController = async (req, res) => {
  try {
    const data = await readNoteExpedientestServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllNoteExpedienteController = async (req, res) => {
  try {
    const data = await getAllNoteExpedientestServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const deleteNoteExpedienteController = async (req, res) => {
  try {
    const data = await deleteNoteExpedientestServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createNoteExpedienteController,
  getAllNoteExpedienteController,
  updateNoteExpedienteController,
  readNoteExpedienteController,
  deleteNoteExpedienteController,
};
