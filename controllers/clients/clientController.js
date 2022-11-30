const {
    createClientServices,
    getAllClientServices,
    updateClientServices,
    readClientServices,
    deleteClientServices,
  } = require("../../services/clients/clientsServices");
  
  const createClientController = async (req, res) => {
    try {
      const data = await createClientServices(req.body);
      return res.status(201).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  const updateClientController = async (req, res) => {
    try {
      const data = await updateClientServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const readClientController = async (req, res) => {
    try {
      const data = await readClientServices(req.params);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  const getAllClientController = async (req, res) => {
    try {
      const data = await getAllClientServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const deleteClientController = async (req, res) => {
    try {
      const data = await deleteClientServices(req.params);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  module.exports = {
    createClientController,
    readClientController,
    getAllClientController,
    updateClientController,
    deleteClientController,
  };