const { Schema, model } = require("mongoose");
const AgenteSchema = Schema({
  username: {
    type: String,
    required: [true, "El username es obligatorio"],
    unique: true,
  },
  fullname: {
    type: String,
    required: [true, "El fullname es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "el mail es obligatorio"],
    unique: true,
  },
  telephones: {
    type: [String],
    required: [true, "el telefono es obligatorio"],
  },
  document: {
    type: String,
    required: [true, "el document es obligatorio"],
    unique: true,
  },
  workplace: {
    type: String,
    required: [true, "el workplace es obligatorio"],
    emun: ["MADRID", "REMOTO"],
  },
  schedule: {
    type: String,
    required: [true, "los horarios son obligatorios"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  job_title: {
    type: Schema.Types.ObjectId,
    ref: "JobTitle",
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Agente = model("Agente", AgenteSchema);

module.exports = Agente;
