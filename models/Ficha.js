const { Schema, model } = require("mongoose");
const FichaSchema = Schema({
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
    type: [String],
  },
  isWeekend: {
    type: Boolean,
  },
  isHoliday: {
    type: Boolean,
  },
  notWork: {
    type:Boolean
  }
});

const Ficha = model("Ficha", FichaSchema);

module.exports = Ficha;
