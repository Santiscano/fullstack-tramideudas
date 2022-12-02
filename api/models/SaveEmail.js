const { Schema, model } = require("mongoose");
const SaveEmailSchema = Schema({
  agente: {
    type: Schema.Types.ObjectId,
    ref: "Agente",
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  to:{
    type:String
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  date: {
    type: Date,
  },
});

const SaveEmail = model("SaveEmail", SaveEmailSchema);

module.exports = SaveEmail;