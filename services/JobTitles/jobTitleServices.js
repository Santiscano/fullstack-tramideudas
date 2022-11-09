const JobTitle = require("../../models/JobTitle");

const createJobTitleServices = async (body) => {
  const { job_title } = body;

  if (!job_title) throw new Error("Debes enviar el cargo");

  const jobTitleValid = await JobTitle.findOne({ job_title });

  if (jobTitleValid) throw new Error("El Cargo debe ser unico");

  return await new JobTitle({ job_title }).save();
};

const getAllJobTitleServices = async () => {
  return await JobTitle.find();
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

  
  return await JobTitle.findByIdAndUpdate({ _id: id },{ job_title: job_title },{new: true,});
};

const readJobTitleServices = async (params) => {
  const { id } = params;

  return await JobTitle.findById(id);
};
const deleteJobTitleServices = async (params) => {
  const { id } = params;

  return await JobTitle.findByIdAndDelete({ _id: id });
};
module.exports = {
  createJobTitleServices,
  readJobTitleServices,
  updateJobTitleServices,
  getAllJobTitleServices,
  deleteJobTitleServices,
};
