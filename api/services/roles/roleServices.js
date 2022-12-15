const Role = require("../../models/Role");

const createRoleServices = async (body) => {
  const { name } = body;

  if(!name) throw new Error('El nombre del rol es obligatorio')

  const roleValid = await Role.findOne({ name });

  if (roleValid) throw new Error("El rol debe ser unico");

  return await new Role({ name }).save();
};

const getAllRoleServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);

  const params = { deleted: { $ne: true } };

  const roles = await Role.find(params)
    .skip(page * limit)
    .limit(limit);

  const count = await Role.countDocuments(params);

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: roles,
  };

  return data;
};

const updateRoleServices = async (params, body) => {
  const { id } = params;
  let { name } = body;

  console.log(id);
  if (!id) throw new Error("revisa el parametro");

  // Validaciones
  if (!name) throw new Error("Envia el nombre del rol");

  const roleValid = await Role.findOne({ name });

  if (roleValid) throw new Error("El rol debe ser unico");

  const role = await Role.findByIdAndUpdate(
    { _id: id },
    { name: name },
    { new: true }
  );

  return role;
};

const readRoleServices = async (params) => {
  const { id } = params;

  const role = await Role.findById(id);

  if (!role) throw new Error('No se encontro el rol')

  return role;
};
const deleteRoleServices = async (params) => {
  const { id } = params;

  const role = await Role.findByIdAndDelete({ _id: id });

  if(!role) throw new Error('No existe ese rol')
  return role
};
module.exports = {
  createRoleServices,
  readRoleServices,
  updateRoleServices,
  getAllRoleServices,
  deleteRoleServices,
};
