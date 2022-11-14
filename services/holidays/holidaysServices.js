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

const getAllHolidayServices = async (params, body) => {
    return await Holiday.find();
};

module.exports = {
  createHolidayServices,
  getAllHolidayServices,
  getHolidayServices
};