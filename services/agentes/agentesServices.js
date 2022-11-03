const Agente = require("../../models/agentes/Agente");
const bcryptjs = require("bcryptjs");
const Role = require("../../models/roles/Role");
const JobTitle = require("../../models/jobTitles/JobTitle");

const createAgentServices = async (body) => {
  let {
    username,
    fullname,
    email,
    telephones,
    document,
    workplace,
    schedule,
    job_title,
    password,
  } = body;

  // validaciones

  if (
    !email ||
    !fullname ||
    !username ||
    !password ||
    !schedule ||
    !document ||
    !workplace ||
    !telephones ||
    !job_title
  ) {
    throw new Error("debes rellenar los campos");
  }

  const usernameValid = await Agente.findOne({ username: username });

  if (usernameValid)
    throw new Error("debes ingresar un username unico y el password");

  // existe cargo

  const jobTilte = await JobTitle.findOne({ job_title });

  if (!jobTilte) {
    throw new Error("el cargo no existe");
  }

  // hash

  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);

  const role = await Role.findOne({ name: "user" });
  const data = {
    username,
    password,
    role: role._id,
    fullname,
    email,
    telephones,
    document,
    workplace,
    schedule,
    job_title: jobTilte._id,
  };

  const agente = await new Agente(data).populate("role", "name");

  agente.save();

  return agente;
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
