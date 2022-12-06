const { Schema, model } = require("mongoose");
const NoteExpedienteSchema = Schema({
    expediente: {
        type: Schema.Types.ObjectId,
        ref: "Expediente",
      },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    agente: {
        type: Schema.Types.ObjectId,
        ref: "Agente",
      },
  note: {
    type:String
  },
});

const NoteExpediente = model("NoteExpediente", NoteExpedienteSchema);

module.exports = NoteExpediente;