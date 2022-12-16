const JobTitle = require("../../models/JobTitle");

const createJobTitleServices = async (body) => {
  const { job_title } = body;

  if (!job_title) throw new Error("Debes enviar el cargo");

  const jobTitleValid = await JobTitle.findOne({ job_title });

  if (jobTitleValid) throw new Error("El Cargo debe ser unico");

  return await new JobTitle({ job_title }).save();
};

const getAllJobTitleServices = async (req) => {
  let { limit = 10, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);

  const params = { deleted: { $ne: true } };

  const jobsTitles = await JobTitle.find(params)
    .skip(page * limit)
    .limit(limit);


  const count = await JobTitle.countDocuments(params);

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: jobsTitles,
  };

  return data;
};

const updateJobTitleServices = async (params, body) => {
  const { id } = params;
  let { job_title } = body;

  console.log(id);
  if (!id) throw new Error("revisa el parametro");

  // Validaciones
  if (!job_title) throw new Error("Envia el Cargo");

  const roleValid = await JobTitle.findOne({ job_title });

  if (roleValid) throw new Error("El cargo debe ser unico");

  
  const cargo = await JobTitle.findByIdAndUpdate({ _id: id },{ job_title: job_title },{new: true,});

  if(!cargo) throw new Error('No existe ese cargo');

  return cargo;
};

const readJobTitleServices = async (params) => {
  const { id } = params;

const cargo = await JobTitle.findById(id);

  if(!cargo) throw new Error('No existe ese cargo');

  return cargo;
};
const deleteJobTitleServices = async (params) => {
  const { id } = params;

  const cargo = await JobTitle.findByIdAndDelete({ _id: id });

  if(!cargo) throw new Error('No existe ese cargo')

  return cargo;
};
module.exports = {
  createJobTitleServices,
  readJobTitleServices,
  updateJobTitleServices,
  getAllJobTitleServices,
  deleteJobTitleServices,
};
