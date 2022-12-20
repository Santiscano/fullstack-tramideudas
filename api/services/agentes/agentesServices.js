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

  if (usernameValid) throw new Error("debes ingresar un username unico");
  if (emailValid) throw new Error("Ese mail no esta disponible");
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
  const { id } = req.params;

  const editor = await Agente.findById({ _id: req.userId });

  if (editor.role.toString() === process.env.CRM_ADMIN_ID) {
    let {
      identity_document,
      email,
      username,
      newPassword,
      name_show_email,
      role,
      telephones,
      job_title,
      isVacation,
      extension,
      avatar,
      password,
      isActive,
      ...rest
    } = req.body;

    if (username) {
      const existUsername = await Agente.findOne({ username });
      if (existUsername) throw new Error("El username es invalido");
      username = username ? { username } : null;
    }

    if (newPassword) {
      const salt = bcryptjs.genSaltSync();
      const dataPassword = bcryptjs.hashSync(newPassword, salt);

      newPassword = newPassword ? { password: dataPassword } : null;
    }

    if (identity_document) {
      const existDocument = await Agente.findOne({ identity_document });
      if (existDocument) throw new Error("Ese documento no es valido");
      identity_document = identity_document ? { identity_document } : null;
    }

    if (name_show_email) {
      name_show_email = name_show_email ? { name_show_email } : null;
    }

    if (telephones) {
      if (!Array.isArray(telephones))
        throw new Error(
          "Los numeros de telefono se deben enviar como un Array[String]"
        );

      telephones = telephones ? { telephones } : null;
    }

    if (isVacation) {
      if (!Array.isArray(isVacation))
        throw new Error(
          "Las vacaciones se deben enviar como un Array[String] "
        );

      const newVacation = isVacation.map((date) =>
        moment(date, "DD/MM/YYYY").format()
      );
      isVacation = isVacation ? { isVacation: newVacation } : null;
    }

    if (email) {
      const emailExist = await Agente.findOne({
        email,
      });
      if (emailExist) throw new Error("Ese mail ya esta registrado");

      const regxGmail = new RegExp(
        "^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$"
      );

      if (!regxGmail.test(email)) throw new Error("Debe ser un gmail valido");

      email = email ? { email } : null;
    }

    if (role) {
      const roleExist = await Role.findOne({
        name: role,
      });

      if (!roleExist) throw new Error("Ese rol no existe");

      role = role ? { role: roleExist._id } : null;
    }

    if (job_title) {
      const job_titleExist = await JobTitle.findOne({job_title});

      if (!job_titleExist) throw new Error("Ese Cargo no existe");

      job_title = job_title ? { job_title: job_titleExist._id } : null;
    }
    if(extension){
      const extensionExist = await Agente.findOne({extension});

      if(extensionExist) throw new Error('Esa extension ya esta en uso')

      extension = extension ? {extension} : null;
    }

    const data = {
      ...username,
      ...email,
      ...name_show_email,
      ...identity_document,
      ...newPassword,
      ...telephones,
      ...isVacation,
      ...role,
      ...extension,
      ...rest,
    };

    const agente = await Agente.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!agente) throw new Error("No existe el agente");

    return agente;
  } else {
    let { name_show_email, telephones, isVacation } = req.body;

    if (name_show_email) {
      name_show_email = name_show_email ? { name_show_email } : null;
    }
    if (telephones) {
      if (!Array.isArray(telephones))
        throw new Error(
          "Los numeros de telefono se deben enviar como un Array[String]"
        );

      telephones = telephones ? { telephones } : null;
    }

    if (isVacation) {
      if (!Array.isArray(isVacation))
        throw new Error(
          "Las vacaciones se deben enviar como un Array[String] "
        );

      const newVacation = isVacation.map((date) =>
        moment(date, "DD/MM/YYYY").format()
      );

      isVacation = isVacation ? { isVacation: newVacation } : null;
    }

    const data = {
      ...name_show_email,
      ...telephones,
      ...isVacation,
    };

    const agente = await Agente.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!agente) throw new Error("No existe el agente");

    return agente;
  }
};

const readAgentServices = async (params) => {
  const { id } = params;

  const agent = await Agente.findById(id);

  if (!agent) throw new Error("Ese agente no existe");

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
