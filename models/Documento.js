const { Schema, model } = require("mongoose");

const DocumentoSchema = Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  path_local: {
    type: String,
  },
  id_amazon: {
    type: String,
  },
  md5: {
    type: String,
  },
  url_local: {
    type: String,
  },
},{ versionKey: false });

const Documento = model("Documento", DocumentoSchema);
module.exports = Documento;
