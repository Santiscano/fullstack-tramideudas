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
  name_show_email: {
    type: String,
    required: [true, "El nombre para mail es obligatorio"],
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
  identity_document: {
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
  avatar:{
    type: String
  },
  isVacation: {
    type: [Date],
  },
  job_title: {
    type: Schema.Types.ObjectId,
    ref: "JobTitle",
  },
  entry_time: {
    type: String,
    required: [true, "La hora de entrada es obligatoria"],
  },
  break_time: {
    type: String,
    required: [true, "La hora de descanso es obligatoria"],
  },
  daily_working_hours: {
    type: String,
    required: [true, "Las horas diarias son obligatorias"],
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  google_access_token: {
    type: String,
  },
  google_refresh_token: {
    type: String,
  },
});

const Agente = model("Agente", AgenteSchema);

module.exports = Agente;
