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

  // recorro cada agente
  agentesId.forEach(async (id) => {
    // busco si existe la ficha
    const findFicha = await Ficha.findOne({
      $and: [
        { agente: { $eq: id } },
        { date: { $gte: moment().startOf("day") } },
        { date: { $lt: moment().endOf("day") } },
      ],
    });

    // busco el agente
    const agente = await Agente.findById(id);
    // recorro los dias de vacaciones

    let agentInVacation;

    if (agente.isVacation.length >= 1) {
      agente.isVacation.forEach((vacations) => {
        const vacation = moment(vacations).format("DD-MMM-YYYY");

        if (vacation === moment().format("DD-MMM-YYYY")) {
          return (agentInVacation = true);
        }
      });
    }
    if (!findFicha) {
      let data;

      if (agentInVacation) {
        data = {
          date: moment().toDate(),
          agente: id,
          isVacation: true,
        };
      }

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

      if (!isHoliday && !isWeekend && !agentInVacation) {
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
