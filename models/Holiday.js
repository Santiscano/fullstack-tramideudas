const { Schema, model } = require("mongoose");
const HolidaySchema = Schema({
  date: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const Holiday = model("Holiday", HolidaySchema);

module.exports = Holiday;
