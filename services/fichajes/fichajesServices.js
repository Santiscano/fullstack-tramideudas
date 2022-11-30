const moment = require("moment");
const momenttz = require("moment-timezone");
const Fichaje = require("../../models/Fichaje");
const Agente = require("../../models/Agente");
const { closeAllFichajes } = require("../../utils/closeAllFichajes");

moment.tz.setDefault("Europe/Madrid");

const createFichasServices = async (req) => {
  const { userId } = req;
  const { justifications } = req.body;
  const { entry_time, break_time } = await Agente.findById({ _id: userId });

  const finchasUnjustified = await Fichaje.findOne({
    agente: userId,
    notWork: true,
    "justifications.notWorked": null,
  });

  if (finchasUnjustified)
    throw new Error(
      `Tienes una falta anterior, Justificala ${finchasUnjustified._id}`
    );

  //Busca la ficha de hoy
  const findFicha = await Fichaje.findOne({
    $and: [
      { agente: { $eq: userId } },
      { date: { $gte: moment().startOf("day") } },
      { date: { $lt: moment().endOf("day") } },
    ],
  });

  console.log(finchasUnjustified);

  // parseo
  const momentNow = moment();
  const entryParse = moment(entry_time, "HH:mm");
  const breakParse = moment(break_time, "mm");

  // si la ficha existe
  if (findFicha) {
    // guardo tiempo de descanso
    if (!findFicha.break)
      await findFicha.updateOne({ break: moment().toDate() });
    //verificar el descanso
    if (findFicha.break && !findFicha.return) {
      const breakNow = moment(findFicha.break);
      const totalMinutes = momentNow.diff(breakNow, "minutes");
      const strictMinutes = breakParse.minutes();

      if (strictMinutes <= totalMinutes && !justifications)
        throw new Error("Volviste tarde envia la justificacion");

      if (justifications)
        await findFicha.updateOne({
          "justifications.break": justifications,
        });

      await findFicha.updateOne({ return: moment().toDate() });
      return "Bienvenido de tu descanso";
    }
    if (findFicha.return && !findFicha.exit) {
      await findFicha.updateOne({ exit: moment().toDate() });
      console.log(findFicha);
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
    const ficha = new Fichaje({
      date: moment().toDate(),
      entry: moment().toDate(),
      agente: userId,
      justifications: { entry: justifications },
    });
    await ficha.save();

    return "Bienvenidx, ten una buena jornada";
  }
};

const readFichasServices = async () => {
  closeAllFichajes();
};

const updateFichajeJustificationsServices = async (params, body) => {
  const { id } = params;
  const { justifications } = body;

  const fichaje = await Fichaje.findById({ _id: id });

  if (!id) throw Error("No enviaste el id del fichaje");
  if (!justifications) throw Error("No enviaste tu justificacion");
  if (!fichaje) throw Error("Esa ficha no existe");

  await fichaje.updateOne({
    "justifications.notWorked": justifications,
  });

  return "Falta justificada";
};

const getAllFichasServices = async (req) => {
  const { daystart = 0, dayend = 0 } = req.query;
  let { limit = 30, page = 0 } = req.params;
  limit = parseInt(limit);
  const { id } = req.params;
  const init = moment(daystart, "DD MM YYYY hh:mm:ss");
  const end = moment(dayend, "DD MM YYYY hh:mm:ss");

  const query = {
    $and: [
      { agente: { $eq: id } },
      { date: { $gte: init } },
      { date: { $lt: end } },
    ],
  };

  const fichas = await Fichaje.find(query)
    .skip(page * limit)
    .limit(limit)
    .lean();

  const count = await Fichaje.countDocuments(query);

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
    total: count,
    page: +page,
    per_page: limit,
    args: { totalHoursWorked },
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
  updateFichajeJustificationsServices,
  getAllFichasServices,
  deleteFichasServices,
};
