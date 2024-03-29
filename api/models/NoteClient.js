const { Schema, model } = require("mongoose");
const NoteClientSchema = Schema({
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
  createdAt: {
    type: Date
  }
});

const NoteClient = model("NoteClient", NoteClientSchema);

module.exports = NoteClient;