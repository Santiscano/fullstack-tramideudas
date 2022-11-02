const { Schema, model } = require("mongoose");
const AgenteSchema = Schema({
  username: {
    type: String,
    required: [true, "El username es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role", 
  },
});

const Agente = model("Agente", AgenteSchema);

module.exports = Agente;
