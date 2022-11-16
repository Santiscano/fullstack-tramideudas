const { Schema, model } = require("mongoose");

const DocumentoSchema = Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  path_local: {
    type: String,
  },
  url_local: {
    type: String,
  },
  id_amazon: {
    type: String,
  },
  md5: {
    type: String,
  },
});

const Documento = model("Documento", DocumentoSchema);
module.exports = Documento;
