const { unlink } = require("fs");
const path = require("path");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Europe/Madrid");

const Temporal = require("../models/temporal");

const deleteTempFiles = async () => {
  // obtengo solo ids de documentos
  const files = await Temporal.find().distinct("_id");

  if (!files) return;

  files.forEach(async (id) => {
    const { file, date, _id } = await Temporal.findOne({ _id: id });

    const momentDate = moment(date);
    const now = moment();

    const total = now.diff(momentDate, "minutes");

    if (total >= 1) {
      const pathFile = path.join(__dirname, "../temp/", file);

      unlink(pathFile, async (err) => {
        if (err) throw err;
        await Temporal.findByIdAndDelete(_id);
        console.log(`deleting file ${file}`);
      });
    }
  });
};

module.exports = {
  deleteTempFiles,
};
