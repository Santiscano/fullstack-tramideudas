const moment = require("moment-timezone");
const Expediente = require("../../models/Expediente");
const Product = require("../../models/Product");
const { previsionPagos } = require("./previsionPagos");

moment.tz.setDefault("Europe/Madrid");

const regexInteger = new RegExp(/^([+-]?[1-9]\d*|0)$/);

const createExpedienteServices = async (req) => {
  //TODO: se tienen que poder subir documentos(se guardaran como array de documentos)
  console.log(req.body);
  let {
    fractioned,
    quotas,
    product,
    price,
    client,
    initial_date,
    unsigned_contract,
    signed_contract,
    unsigned_authorizations,
    signed_authorizations,
  } = req.body;

  fractioned = fractioned === 'true' 
  price = parseFloat(price)
  quotas = parseInt(quotas)

console.log(fractioned);
  if (!client) throw new Error("Debes enviar el cliente");

  const productDB = await Product.findOne({ _id: product });

  if (!productDB) throw new Error("ese producto no existe o no se encuentra");

  if (productDB.isBankable === true) {
    if (fractioned) {
      if (!quotas) throw new Error("Envia las cuotas");
      const result = regexInteger.test(quotas);
      if (!result) throw new Error("quotas debe ser un entero");
    }
    fractioned =
      fractioned !== true ? { fractioned: false } : { fractioned, quotas };
  } 

  const initial = moment(initial_date,"DD/MM/YYYY").format()

  const string = moment().toString()

 


  console.log(initial,string);
  const data = {
    client,
    product: productDB._id,
    price:  price ? price : price = productDB.price,
    ...fractioned,
    date: moment().toDate(),
    initial_date: initial,
    unsigned_contract,
    signed_contract,
    unsigned_authorizations,
    signed_authorizations,
  };

  const newExpediente = await new Expediente(data).save();

  if (newExpediente.fractioned === true) {
    previsionPagos(newExpediente);
  }

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

const updateExpedienteServices = async (req) => {
  // TODO: se puede editar el estado
};
const readExpedienteServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const data = await Expediente.findOne({ _id: id }).lean();

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
