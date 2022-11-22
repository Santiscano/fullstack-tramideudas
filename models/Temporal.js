const { Schema, model } = require("mongoose");
const TemporalSchmea = Schema({
  file: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Temporal = model("Temporal", TemporalSchmea);

module.exports = Temporal;