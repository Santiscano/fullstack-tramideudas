const { Schema, model } = require("mongoose");

const PrevisionPagoSchema = Schema({
  quoteNumber: {
    type: Number,
  },
  date: {
    type: Date,
  },
  total: {
    type: Number,
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref:"Expediente",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref:"Client",
  },
},{ versionKey: false });

const PrevisionPago = model("PrevisionPago", PrevisionPagoSchema);
module.exports = PrevisionPago;