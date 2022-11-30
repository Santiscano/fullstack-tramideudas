const Agente = require("../../models/Agente");
const bcryptjs = require("bcryptjs");
const Role = require("../../models/Role");
const JobTitle = require("../../models/JobTitle");

const createAgentServices = async (body) => {
  let {
    username,
    fullname,
    name_email,
    email,
    telephones,
    identity_document,
    workplace,
    schedule,
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
    !name_email ||
    !username ||
    !password ||
    !schedule ||
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

  //TODO:VALIDAR MEJOR QUE EL EMAIL EL USER Y EL DOCUMENT SEAN UNICOS

  const usernameusernameEmailDocumentValidValid = await Agente.findOne({
    username: username,
    email: email,
    identity_document: identity_document,
  });

  if (usernameEmailDocumentValid)
    throw new Error(
      "debes ingresar un username, email, dni unico y el password "
    );
  const documentExist = await Agente.findOne({ identity_document: identity_document });

  if (documentExist) throw new Error("El documento no es valido");

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
    name_show_email: name_email,
    password,
    role: role._id,
    fullname,
    email,
    telephones,
    identity_document,
    workplace,
    schedule,
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

const  updatePasswordServices = async (params, body) => {
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
const  updateAgentServices = async (req) => {
  let { identity_document, email, username, password, newPassword, isVacation, } = req.body;
  let {id} = req.params

  // TODO: PREGUNTAR CUALES CAMPOS SON EDITABLES Y CUALES NO

  // TODO: SI EL DOCUMENTO O EL MAIL SE CAMBIAN VERIFICAR QUE SEAN UNICOS
  
  // TODO: MEJORAR VALIDACIONES

  if (!email) throw new Error("envia tu email");
  if (!username) throw new Error("envia tu username");
  if(!identity_document) throw new Error('Debes enviar el documento')
  if (!password) throw new Error("envia tu password");
  if (!newPassword) throw new Error("envia tu nuevo password");
  if (password === newPassword) throw new Error("Pon una nueva contraseña");

  const agent = await Agente.findOne({ _id: id});

  if (!agent) throw new Error("Revisa los datos enviados");

  const check = bcryptjs.compareSync(password, agent.password);

  console.log(check)
  
  if (!check || check === false) throw new Error("La contraseña no coincide");
 
if (check) {
  
  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(newPassword, salt);


 let data = {
    password,
    email,
    isVacation
  }

  return await Agente.findByIdAndUpdate(data);
  
}

 
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
