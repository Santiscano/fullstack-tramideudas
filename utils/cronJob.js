const cron = require("node-cron");
const { closeAllFichajes } = require("./closeAllFichajes");
const { deleteTempFiles } = require("./deteleTempFiles");

// cierre de fichas
cron.schedule(
  "0 22 * * *",
  async () => {
    try {
      console.log("cierre de fichas programadas");
      closeAllFichajes();
    } catch (error) {
      console.log(error);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Madrid",
  }
);
// borrar archivos temporales
// */2 * * * *"
cron.schedule(
  "* * * * *",
  async () => {
    try {
      console.log("Borrando archivos temporales...");
      deleteTempFiles()
    } catch (error) {
      console.log(error);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Madrid",
  }
);
