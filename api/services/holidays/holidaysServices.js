const Holiday = require("../../models/Holiday");

const createHolidayServices = async (body) => {

const {date,reason,} = body

if (!date || !reason) throw new Error("debes enviar el dia con el mes y la razon del feriado");

const dateValid = await Holiday.findOne({ date });

if (dateValid) throw new Error("Ya existe ese feriado");

return await new Holiday({ date,reason}).save();

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

module.exports = {
  createHolidayServices,
  getAllHolidayServices,
  getHolidayServices
};