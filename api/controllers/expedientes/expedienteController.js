const {
    createExpedienteServices,
    getAllExpedienteServices,
    updateExpedienteServices,
    readExpedienteServices,
    deleteExpedienteServices,
  } = require("../../services/expedientes/expedientesServices");
  
  const createExpedienteController = async (req, res) => {
    try {
      const data = await createExpedienteServices(req);
      return res.status(201).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  const updateExpedienteController = async (req, res) => {
    try {
      const data = await updateExpedienteServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const readExpedienteController = async (req, res) => {
    try {
      const data = await readExpedienteServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  const getAllExpedienteController = async (req, res) => {
    try {
      const data = await getAllExpedienteServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const deleteExpedienteController = async (req, res) => {
    try {
      const data = await deleteExpedienteServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  module.exports = {
    createExpedienteController,
    getAllExpedienteController,
    updateExpedienteController,
    readExpedienteController,
    deleteExpedienteController,
  };