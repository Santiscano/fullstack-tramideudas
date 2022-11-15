const cron = require("node-cron");
const { closeAllFichajes } = require("./closeAllFichajes");

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
