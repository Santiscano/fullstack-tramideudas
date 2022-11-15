const moment = require("moment");
const Agente = require("../models/Agente");
const Ficha = require("../models/Fichaje");
const Holiday = require("../models/Holiday");

require("moment-timezone");

moment.tz.setDefault("Europe/Madrid");

const dayAndMouth = moment().format("D-M");

const dayOfWeek = moment().format("dddd");
const isWeekend = dayOfWeek === "Sunday" || dayOfWeek === "Saturday";

const closeAllFichajes = async () => {
  const agentesId = await Agente.find()
    .where({ isActive: true })
    .distinct("_id");

  // obtengo si hay un feriado
  const isHoliday = await Holiday.findOne({ date: dayAndMouth });

  agentesId.forEach(async (id) => {
    
    const findFicha = await Ficha.findOne({
      $and: [
        { agente: { $eq: id } },
        { date: { $gte: moment().startOf("day") } },
        { date: { $lt: moment().endOf("day") } },
      ],
    });

    if (!findFicha) {
      let data;

      if (isWeekend) {
        data = {
          date: moment().toDate(),
          agente: id,
          isWeekend: true,
        };
      }

      if (isHoliday) {
        data = {
          date: moment().toDate(),
          agente: id,
          isHoliday: true,
        };
      }

      if (!isHoliday && !isWeekend) {
        data = {
          date: moment().toString(),
          agente: id,
          notWork: true,
        };
      }

      return new Ficha(data).save();
    }
  });
};

module.exports = { closeAllFichajes };
