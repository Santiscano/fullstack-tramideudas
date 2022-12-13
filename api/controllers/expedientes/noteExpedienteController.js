const {
  createNoteExpedientestServices,
  getAllNoteExpedientestServices,
  readNoteExpedientestServices,
} = require("../../services/expedientes/NoteExpedientesServices");

const createNoteExpedienteController = async (req, res) => {
  try {
    const data = await createNoteExpedientestServices(req);
    return res.status(201).json({ response: data });
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

module.exports = {
  createNoteExpedienteController,
  getAllNoteExpedienteController,
  readNoteExpedienteController,
};
