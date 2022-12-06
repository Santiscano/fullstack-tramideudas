const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  isBankable: {
    type: Boolean,
  },
},{ versionKey: false });

const Product = model("Product", ProductSchema);
module.exports = Product;