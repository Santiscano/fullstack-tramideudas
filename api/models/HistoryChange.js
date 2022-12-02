const { Schema, model } = require("mongoose");
const HistoryChangeSchema = Schema({
  agente: {
    type: Schema.Types.ObjectId,
    ref: "Agente",
  },
  changes:Array,
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  date: {
    type: Date,
  },
});

const HistoryChange = model("HistoryChange", HistoryChangeSchema);

module.exports = HistoryChange;