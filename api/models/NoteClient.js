const { Schema, model } = require("mongoose");
const HistoryChangeSchema = Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
  note: {
    type:String
  },

  agente: {
    type: Schema.Types.ObjectId,
    ref: "Agente",
  },
});

const HistoryChange = model("HistoryChange", HistoryChangeSchema);

module.exports = HistoryChange;