const moment = require("moment");
const momenttz = require("moment-timezone");
const Ficha = require("../../models/Ficha");
const Agente = require("../../models/Agente");

moment.tz.setDefault("Europe/Madrid");

const createFichasServices = async (req) => {
  const { userId } = req;
  const { justifications } = req.body;
  const { entry_time, break_time } = await Agente.findById({ _id: userId });

  //Busca la ficha de hoy
  const findFicha = await Ficha.findOne({
    $and: [
      { agente: { $eq: userId } },
      { date: { $gte: moment().startOf("day") } },
      { date: { $lt: moment().endOf("day") } },
    ],
  });

  // parseo
  const entryParse = moment(entry_time, "HH:mm");
  const momentNow = moment();

  const breakParse = moment(break_time, "mm");

  // console.log(breakParse);
  // console.log(entry_time, "hora entrada sin parsear");
  // console.log(momentNow, "hora actual");
  // console.log(entryParse, "hora en la que deberia entrar");

  //console.log(momentNow.isSameOrBefore(entryParse));

  // verificar si es tarde

  // si la ficha existe
  if (findFicha) {
    // guardo tiempo de descanso
    if (!findFicha.break)
      await findFicha.updateOne({ break: moment().toDate() });
    //verificar el descanso
    if (findFicha.break && !findFicha.return) {
      // usar diff?
      //si llego con minutos de diferencia los minutos que tiene, pedir justificacion

      const breakNow = moment(findFicha.break);
      const totalMinutes = momentNow.diff(breakNow, "minutes");
      const strictMinutes = breakParse.minutes();

      // console.log(strictMinutes, "minutos que tiene para descansar");
      // console.log(momentNow.diff(breakNow, "minutes"), "minutos que descanso");

      if (strictMinutes <= totalMinutes && !justifications)
        throw new Error("Volviste tarde envia la justificacion");

      if (justifications)
        await findFicha.update({ $push: { justifications: justifications } });

      await findFicha.updateOne({ return: moment().toDate() });
      return "Bienvenido de tu descanso";
    }
    if (findFicha.return && !findFicha.exit) {
      await findFicha.updateOne({ exit: moment().toDate() });

      return "Fecha de salida registrada!";
    }

    if (findFicha.exit) {
      return "Ya registraste tu ficha de hoy!";
    }
    return "Disfruta tu descanso";
  }

  if (!findFicha) {
    if (!momentNow.isSameOrBefore(entryParse) && !justifications)
      throw new Error("Entraste tarde, debes enviar tu justificacion");

    // crear ficha
    const ficha = new Ficha({
      date: moment().toDate(),
      entry: moment().toDate(),
      agente: userId,
      justifications,
    });
    await ficha.save();

    return "Bienvenidx, ten una buena jornada";
  }
};

const getAllFichasServices = async () => {};

const updateFichasServices = async (params, body) => {
  console.log("PUT");
};

const readFichasServices = async (req) => {
  const { daystart = 0, dayend = 0 } = req.query;
  const { limit = 30, page = 0 } = req.params;
  const { id } = req.params;

  const init = moment(daystart, "DD MM YYYY hh:mm:ss");
  const end = moment(dayend, "DD MM YYYY hh:mm:ss");

  const fichas = await Ficha.find({
    $and: [
      { agente: { $eq: id } },
      { date: { $gte: init } },
      { date: { $lt: end } },
    ],
  })
    .skip(page * limit)
    .limit(limit)
    .lean();

  // obtener dias que menos trabajó
  const fichaComplete = fichas.map((ficha) => {
    const horasworking = moment(ficha.exit).diff(moment(ficha.entry), "hours");

    return {
      ...ficha,
      hoursWorked: horasworking,
    };
  });

  const totalHoursWorked = fichaComplete.reduce(
    (acc, actual) => acc + actual.hoursWorked,
    0
  );

  const data = {
    page: +page,
    totalHoursWorked,
    result: fichaComplete.sort((x, y) => x.hoursWorked - y.hoursWorked),
  };

  return data;
};
const deleteFichasServices = async (params) => {
  console.log("DELETE");
};
module.exports = {
  createFichasServices,
  readFichasServices,
  updateFichasServices,
  getAllFichasServices,
  deleteFichasServices,
};
