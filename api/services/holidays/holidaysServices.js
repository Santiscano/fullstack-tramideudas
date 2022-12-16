const Holiday = require("../../models/Holiday");

const createHolidayServices = async (body) => {

const {date,reason,} = body

if (!date || !reason) throw new Error("debes enviar el dia con el mes y la razon del feriado");

const dateValid = await Holiday.findOne({ date });

if (dateValid) throw new Error("Ya existe ese feriado");

return await new Holiday({ date,reason}).save();

};
const updateHolidayServices = async (req) => {
const {id} = req.params
const {date,reason,} = req.body 
let dateValid;

if(date) dateValid = await Holiday.findOne({ date });

if(dateValid) throw new Error("Ya existe ese feriado");

const feriado = await Holiday.findByIdAndUpdate({_id:id},{...req.body},{new:true});

if(!feriado) throw new Error('Ese feriado no existe')

return feriado

};

const getHolidayServices = async (params) => {

    const { id } = params;
    return await Holiday.findById(id);

};

const getAllHolidayServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);

  const params = { deleted: { $ne: true } };

  const holidays = await Holiday.find(params)
    .skip(page * limit)
    .limit(limit);

  const count = await Holiday.countDocuments(params);

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: holidays,
  };

  return data;
};
const deleteHolidayServices = async (req) => {
  const { id } = req.params;
  if (!id) throw new Error("Envia el id del feriado");
  const data = await Holiday.findByIdAndRemove(
    { _id: id },
    { new: true }
  ).lean();
  if (!data) throw new Error("Ese feriado no se encuentra");
  return data;
};

module.exports = {
  createHolidayServices,
  getAllHolidayServices,
  getHolidayServices,
  updateHolidayServices,
  deleteHolidayServices
};