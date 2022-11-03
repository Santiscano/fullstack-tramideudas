const {
  createAgentServices,
  getAllAgentServices,
  updateAgentServices,
  readAgentServices,
  deleteAgentServices,
} = require("../../services/agentes/agentesServices");

const createAgentController = async (req, res) => {
  try {
    const data = await createAgentServices(req.body);
    return res.status(201).send(data);
  } catch (error) {
    res.status(400).json({msg:error.message});
  }
};

const updateAgentController = async (req, res) => {
  try {
    const data = await updateAgentServices(req.params, req.body);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({msg:error.message});
  }
};
const readAgentController = async (req, res) => {
  try {
    const data = await readAgentServices(req.params);
    return res.status(204).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

const getAllAgentController = async (req, res) => {
  try {
    const data = await getAllAgentServices();
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const deleteAgentController = async (req, res) => {
  try {
    const data = await deleteAgentServices(req.params);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createAgentController,
  readAgentController,
  getAllAgentController,
  updateAgentController,
  deleteAgentController,
};
