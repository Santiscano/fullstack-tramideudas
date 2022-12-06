const {
  createAgentServices,
  getAllAgentServices,
  updateAgentServices,
  updatePasswordServices,
  updateAgentAvatarServices,
  readAgentServices,
  deleteAgentServices,
} = require("../../services/agentes/agentesServices");

const createAgentController = async (req, res) => {
  try {
    const data = await createAgentServices(req.body);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const updateAgentController = async (req, res) => {
  try {
    const data = await updateAgentServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const updateAgentAvatarController = async (req, res) => {
  try {
    const data = await updateAgentAvatarServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const updatePasswordController = async (req, res) => {
  try {
    const data = await updatePasswordServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const readAgentController = async (req, res) => {
  try {
    const data = await readAgentServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllAgentController = async (req, res) => {
  try {
    const data = await getAllAgentServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const deleteAgentController = async (req, res) => {
  try {
    const data = await deleteAgentServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createAgentController,
  readAgentController,
  getAllAgentController,
  updateAgentController,
  updateAgentAvatarController,
  updatePasswordController,
  deleteAgentController,
};
