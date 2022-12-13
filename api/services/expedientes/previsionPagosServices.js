const moment = require("moment");
require("moment-timezone");
const PrevisionPago = require("../../models/PrevisionPago");
const { reprevisionPagos, previsionPagos } = require("./previsionPagos");

moment.tz.setDefault("Europe/Madrid");

const updatePrevisionPagosServices = async (req) => {
  const { id, init, newdate } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const dayInit = moment(init, "DD-MM-YYYY");

  console.log(dayInit);

  const query = {
    $and: [
      { expediente: { $eq: id } },
      { date: { $gte: moment(dayInit).toDate() } },
    ],
  };

  const previsionPagos = await PrevisionPago.find(query).lean();

  console.log(previsionPagos);

  return await reprevisionPagos(previsionPagos, newdate);
};

const updateOnePrevisionPagosServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const previsionPagosExist = await PrevisionPago.findOne({ _id: id });

  if (!previsionPagosExist) throw new Error("No existe esa prevision");

  return await PrevisionPago.findByIdAndUpdate({_id:previsionPagosExist._id},{...req.body},{new:true})
};
const readPrevisionPagosServices = async (req) => {
  //TODO:ORDENAR POR FECHAS DE PAGO

  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const data = await PrevisionPago.find({ expediente: id }).lean();

  if (!data || data.length === 0) throw new Error("No existe ese expendiente");

  return data;
};

module.exports = {
  updatePrevisionPagosServices,
  updateOnePrevisionPagosServices,
  readPrevisionPagosServices,
};
