const {
    createNoteClientsServices,
    getAllNoteClientsServices,
    readNoteClientsServices,
  } = require("../../services/clients/noteClientsServices");
  
  const createNoteClientController = async (req, res) => {
    try {
      const data = await createNoteClientsServices(req);
      return res.status(201).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  const readNoteClientController = async (req, res) => {
    try {
      const data = await readNoteClientsServices(req.params);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  const getAllNoteClientController = async (req, res) => {
    try {
      const data = await getAllNoteClientsServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  module.exports = {
    createNoteClientController,
    readNoteClientController,
    getAllNoteClientController,
  };