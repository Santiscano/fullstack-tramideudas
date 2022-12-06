const moment = require("moment");
const PrevisionPago = require("../../models/PrevisionPago");
require("moment-timezone");

moment.tz.setDefault("Europe/Madrid");

const previsionPagos = async (data) => {
  let { date, _id, client, price, quotas } = data;
  const total = price / quotas;

  for (let i = 0; i < quotas; i++) {
    const dates = moment(date).add(i, "M");

    await new PrevisionPago({
      quoteNumber: i + 1,
      date: dates,
      total,
      expediente: _id,
      client,
    }).save();
  }
};

module.exports = { previsionPagos };
