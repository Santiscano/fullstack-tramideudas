const {
   getAllHolidayServices,
   getHolidayServices,
   createHolidayServices
} = require("../../services/holidays/holidaysServices");

const getHoliday = async (req, res) => {
  try {
    const data = await getHolidayServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const getAllHoliday = async (req, res) => {
  try {
    const data = await getAllHolidayServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const createHoliday = async (req, res) => {
  try {
    const data = await createHolidayServices(req.body);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createHoliday,
  getAllHoliday,
  getHoliday
};