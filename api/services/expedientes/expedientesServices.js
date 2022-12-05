const Expediente = require("../../models/Expediente");

const regexInteger = new RegExp(/^([+-]?[1-9]\d*|0)$/);
const regexDouble = new RegExp(/\-?\d+\.\d+/);

const createExpedienteServices = async (req) => {
  let {
    fractioned,
    quotas,
    price,
    product,
    client,
    unsigned_contract,
    signed_contract,
    unsigned_authorizations,
    signed_authorizations,
  } = req.body;

  if (!client) throw new Error("Debes enviar el cliente");

  if (product) {
    if (!price) throw new Error("debes enviar el precio");
  }
  if (price) {
    const result = regexDouble.test(price);
    if (!result) throw new Error("el precio debe ser un double");
  }

  if (fractioned) {
    if (!quotas) throw new Error("Envia las cuotas");
    const result = regexInteger.test(quotas);
    if (!result) throw new Error("quotas debe ser un entero");
  }
  fractioned =
    fractioned !== true ? { fractioned: false } : { fractioned, quotas };

  const data = {
    client,
    product,
    price,
    ...fractioned,
    unsigned_contract,
    signed_contract,
    unsigned_authorizations,
    signed_authorizations,
  };

  await new Expediente(data).save();

  return data;
};

const getAllExpedienteServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const expediente = await Expediente.find()
    .skip(page * limit)
    .limit(limit);

  const count = await Expediente.countDocuments();

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: expediente,
  };

  return data;
};

const updateExpedienteServices = async (req) => {};
const readExpedienteServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const data = await Expediente.findOne({ _id: id }).lean();

  console.log(data);

  if (!data) throw new Error("No existe ese expendiente");

  return data;
};

const deleteExpedienteServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const data = await Expediente.findByIdAndRemove(
    { _id: id },
    { new: true }
  ).lean();

  if (!data) throw new Error("Ese expediente no se encuentra");

  return data;
};
module.exports = {
  createExpedienteServices,
  getAllExpedienteServices,
  updateExpedienteServices,
  readExpedienteServices,
  deleteExpedienteServices,
};
