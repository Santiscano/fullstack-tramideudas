const { Schema, model } = require("mongoose");
const RutaSchema = Schema({
  ruta: {
    type: String,
    required: [true, "La ruta es obligatoria"],
    unique: true,
  },
  GET: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }],
  POST: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }],
  PUT: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }],
  DELETE: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }]
});

const Ruta = model("Ruta", RutaSchema);

module.exports = Ruta;