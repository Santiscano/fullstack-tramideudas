const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
require("moment-timezone");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);

moment.tz.setDefault("Europe/Madrid");

const Agente = require("../../models/Agente");
const bcryptjs = require("bcryptjs");
const Role = require("../../models/Role");
const JobTitle = require("../../models/JobTitle");

const createAgentServices = async (body) => {
  let {
    username,
    fullname,
    name_show_email,
    email,
    telephones,
    identity_document,
    workplace,
    job_title,
    password,
    init_time,
    break_time,
    isVacation,
    daily_working_hours,
  } = body;

  // validaciones

  if (
    !email ||
    !fullname ||
    !name_show_email ||
    !username ||
    !password ||
    !identity_document ||
    !workplace ||
    !telephones ||
    !init_time ||
    !break_time ||
    !daily_working_hours ||
    !job_title
  ) {
    throw new Error("debes rellenar los campos");
  }

  const regxGmail = new RegExp("^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$");

  if (!regxGmail.test(email)) throw new Error("Debe ser un gmail valido");

  const usernameValid = await Agente.findOne({
    username,
  });
  const emailValid = await Agente.findOne({
    email,
  });

  if (usernameValid)
    throw new Error(
      "debes ingresar un username unico"
    );
  if (emailValid)
    throw new Error(
      "Ese mail no esta disponible"
    );
  const documentExist = await Agente.findOne({
    identity_document,
  });

  if (documentExist) throw new Error("Ese documento de identidad no es valido");

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
    name_show_email,
    password,
    role: role._id,
    fullname,
    email,
    telephones,
    identity_document,
    workplace,
    entry_time: init_time,
    break_time,
    daily_working_hours,
    job_title: jobTilte._id,
    isVacation,
  };

  const agente = await new Agente(data).populate("role", "name");

  agente.save();

  return agente;
};

const getAllAgentServices = async () => {
  const agents = await Agente.find();
  return agents;
};

const updatePasswordServices = async (params, body) => {
  const { id } = params;
  let { username, password, isVacation } = body;

  // Validaciones

  if (!username || !password) {
    throw new Error("debes ingresar un username unico y el password");
  }

  const usernameValid = await Agente.findOne({ username });

  if (!usernameValid)
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
const updateAgentAvatarServices = async (req) => {
  const { id } = req.params;

  let avatar, uploadPath;

  if (!req.files || Object.keys(req.files).length === 0)
    throw new Error("No enviaste ninguna imagen");

  avatar = req.files.avatar[0] || req.files.avatar;

  if (!avatar) throw new Error("No enviaste ninguna imagen");

  if (Object.keys(req.files).length >= 2)
    throw new Error("Envia solo una imagen para tu avatar");
  const extension = avatar.name.split(".").at(-1);
  const newName = uuidv4() + "." + extension;

  console.log(avatar, newName);

  uploadPath = path.join(__dirname, "../../uploads/avatar/", newName);
  //subo los archivos al path
  avatar.mv(uploadPath, (err) => {
    if (err) return console.log(err);
  });

  const agent = await Agente.findByIdAndUpdate(
    { _id: id },
    { avatar: uploadPath },
    { new: true }
  );

  return agent;
};
const updateAgentServices = async (req) => {

  let {
    identity_document,
    email,
    username,
    password,
    newPassword,
    image_profile,
    name_show_email,
    role,
    fullname,
    telephones,
    workplace,
    schedule,
    entry_time,
    break_time,
    daily_working_hours,
    job_title,
    isVacation,
  } = req.body;

  let { id } = req.params;
  let data;

  if (!email) throw new Error("envia tu email");
  if (!username) throw new Error("envia tu username");
  if (!identity_document) throw new Error("Debes enviar el documento");

  // if (!password) throw new Error("envia tu password");
  // if (!newPassword) throw new Error("envia tu nuevo password");
  // if (password === newPassword) throw new Error("Pon una nueva contraseña");

  const agent = await Agente.findOne({ _id: id });

  if (!agent) throw new Error("Revisa los datos enviados");

  // const check = bcryptjs.compareSync(password, agent.password);

  // console.log(check);

  // if (!check || check === false) throw new Error("La contraseña no coincide");

  // if (check) {

  //   const salt = bcryptjs.genSaltSync();
  //   password = bcryptjs.hashSync(newPassword, salt);

  //   data = {
  //     password,
  //     email,
  //     isVacation
  //   }
  //   return await Agente.findByIdAndUpdate(data);
  // }

  data = {
    image_profile,
    name_show_email,
    role,
    fullname,
    telephones,
    workplace,
    schedule,
    entry_time,
    break_time,
    daily_working_hours,
    job_title,
    isVacation,
  };
  return await Agente.findByIdAndUpdate({ _id: agent.id }, data);
};

const readAgentServices = async (params) => {
  const { id } = params;

  const agent = await Agente.findById(id);

  if (!agent) throw new Error('Ese agente no existe')

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
  updateAgentAvatarServices,
};
