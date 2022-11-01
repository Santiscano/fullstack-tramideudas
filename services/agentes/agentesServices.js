const Agente = require("../../models/agentes/Agente");
const bcryptjs = require("bcryptjs");

const createAgentServices = async (body) => {
  let { password, username } = body;

  // validaciones

  if (!username || !password) {
    throw new Error("debes ingresar un username unico y el password");
  }

  const usernameValid = await Agente.findOne({ username: username });

  if (usernameValid)
    throw new Error("debes ingresar un username unico y el password");

  // hash

  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);

  console.log(password);

  const data = {
    username,
    password,
  };

  return await new Agente(data).save();
};

const getAllAgentServices = async () => {
  const agents = await Agente.find();
  return agents;
};

const updateAgentServices = async (params, body) => {
  const { id } = params;
  let { username, password } = body;

  // Validaciones

  if (!username || !password) {
    throw new Error("debes ingresar un username unico y el password");
  }

  const usernameValid = await Agente.findOne({ username: username });

  if (usernameValid)
    throw new Error("debes ingresar un username unico y el password");

  //hash

  if (password) {
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
  }

  const data = {
    username,
    password,
  };

  const agent = await Agente.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  return agent;
};

const readAgentServices = async (params) => {
  const { id } = params;

  const agent = await Agente.findById(id);

  return agent;
};
const deleteAgentServices = async (params) => {
  const { id } = params;

  return await Agente.findByIdAndDelete({ _id: id });
};
module.exports = {
  createAgentServices,
  readAgentServices,
  updateAgentServices,
  getAllAgentServices,
  deleteAgentServices,
};
