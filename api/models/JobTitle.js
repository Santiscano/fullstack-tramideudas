const { Schema, model } = require("mongoose");
const JobTitleSchema = Schema({
  job_title: {
    type: String,
    required: [true, "el nombre del Cargo es obligatorio"],
  },
});

const JobTitle = model("JobTitle", JobTitleSchema);

module.exports = JobTitle;
