const { Schema, model } = require("mongoose");

const ExpedienteSchema = Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  product: {
    type: String,
  },
  price: {
    type: Number,
  },
  fractioned: {
    type: Boolean,
  },
  quotas: {
    type: Number,
  },
  unsigned_contract: {
    type: String,
  },
  signed_contract: {
    type: String,
  },
  unsigned_authorizations: {
    type: String,
  },
  signed_authorizations: {
    type: String,
  },
},{ versionKey: false });

const Expediente = model("Expediente", ExpedienteSchema);
module.exports = Expediente;