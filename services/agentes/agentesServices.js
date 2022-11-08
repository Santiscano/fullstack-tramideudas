const Agente = require("../../models/Agente");
const bcryptjs = require("bcryptjs");
const Role = require("../../models/Role");
const JobTitle = require("../../models/JobTitle");

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

  const usernameValid = await Agente.findOne({
    username: username,
    email: email,
    document: document,
  });

  if (usernameValid)
    throw new Error(
      "debes ingresar un username, email, dni unicos y el password "
    );

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
const updatePasswordServices = async (body) => {
  let { document, email, username, password, newPassword } = body;

  if (!document) throw new Error("envia el documento");
  if (!email) throw new Error("envia tu email");
  if (!username) throw new Error("envia tu username");
  if (!password) throw new Error("envia tu password");
  if (!newPassword) throw new Error("envia tu nuevo password");
  if (password === newPassword) throw new Error("Pon una nueva contraseña");

  const agent = await Agente.findOne({ document, email, username });

  if (!agent) throw new Error("Revisa los datos enviados");

  const check = bcryptjs.compareSync(password, agent.password);

  if (!check) {
    throw new Error("La contraseña no coincide");
  }

  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(newPassword, salt);

  return await Agente.findByIdAndUpdate(
    { _id: agent.id },
    { password: password },
    { new: true }
  );
};

const readAgentServices = async (params) => {
  const { id } = params;

  const agent = await Agente.findById(id);

  return agent;
};
const deleteAgentServices = async (params) => {
  const { id } = params;

  return await Agente.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );
};
module.exports = {
  createAgentServices,
  readAgentServices,
  updateAgentServices,
  getAllAgentServices,
  deleteAgentServices,
  updatePasswordServices,
};
