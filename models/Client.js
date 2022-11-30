const { Schema, model } = require("mongoose");
const ClientSchema = Schema({
  name: {
    type: String,
  },
  surnames: {
    type: String,
  },
  indentity_document: {
    type: String,
  },
  telephone:[{
        number:String,
        main:Boolean
  }],
 email: {
    type: String,
  },
  address: {
    type_via: {
      type: String,
    },
    name_via: {
      type: String,
    },
    number_via: {
      type: String,
    },
    block: {
      type: String,
    },
    portal:{
        type: String,
    },
    ladder:{
        type:String,
    },
    floor: {
      type: String,
    },
    door: {
      type: String,
    },
    km: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    province: {
      type: String,
    },
    municipality: {
      type: String,
    },
    locality: {
      type: String,
    },
    community: {
      type: String,
    },
  },
  advertising_allowed: {
    type: Boolean,
  },
  deleted: {
    type: Boolean,
  },
},{ versionKey: false,timestamps:true },);

const Client = model("Client", ClientSchema);

module.exports = Client;
