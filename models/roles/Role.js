const { Schema, model } = require("mongoose");
const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del Rol es obligatorio"],
    unique: true,
  }
});

const Role = model("Role", RoleSchema);

module.exports = Role;
