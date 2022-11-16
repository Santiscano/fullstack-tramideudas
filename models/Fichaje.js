const { Schema, model } = require("mongoose");
const FichajeSchema = Schema({
  agente: {
    type: Schema.Types.ObjectId,
    ref: "Agente",
  },
  date: {
    type: Date,
  },
  entry: {
    type: Date,
  },
  break: {
    type: Date,
  },
  return: {
    type: Date,
  },
  exit: {
    type: Date,
  },
  justifications: {
    entry: {
      type: String,
    },
    break: {
      type: String,
    },
    notWorked: {
      type: String,
    },
  },
  isWeekend: {
    type: Boolean,
  },
  isHoliday: {
    type: Boolean,
  },
  notWork: {
    type: Boolean,
  },
  isVacation: {
    type: Boolean,
  },
});

const Fichaje = model("Fichaje", FichajeSchema);

module.exports = Fichaje;
