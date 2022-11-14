const cron = require('node-cron');
const {closeAllFichas} = require('./closeAllFichas');

cron.schedule('0 22 * * *', async() => {
    try {
        console.log('cierre de fichas programadas');
        closeAllFichas()
    } catch (error) {
        console.log(error);
    }
}, {
  scheduled: true,
  timezone: "Europe/Madrid"
});

