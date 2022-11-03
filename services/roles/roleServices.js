const Role = require("../../models/roles/Role");

const createRoleServices = async (body) => {
  const { name } = body;

  const roleValid = await Role.findOne({ name });

  if (roleValid) throw new Error("El rol debe ser unico");

  return await new Role({ name }).save();
};

const getAllRoleServices = async () => {
  return await Role.find();
};

const updateRoleServices = async (params, body) => {
  const { id } = params;
  let { name } = body;

  console.log(id);
  if (!id) throw new Error("revisa el parametro");

  // Validaciones
  if (!name) throw new Error("Envia el role");

  const roleValid = await Role.findOne({ name });

  if (roleValid) throw new Error("El rol debe ser unico");

  const role = await Role.findByIdAndUpdate(
    { _id: id },
    { name: name },
    {
      new: true,
    }
  );

  return role;
};

const readRoleServices = async (params) => {
  const { id } = params;

  const role = await Role.findById(id);

  return role;
};
const deleteRoleServices = async (params) => {
  const { id } = params;

  return await Role.findByIdAndDelete({ _id: id });
};
module.exports = {
  createRoleServices,
  readRoleServices,
  updateRoleServices,
  getAllRoleServices,
  deleteRoleServices,
};
