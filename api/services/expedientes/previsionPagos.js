const moment = require("moment");
const PrevisionPago = require("../../models/PrevisionPago");
require("moment-timezone");

moment.tz.setDefault("Europe/Madrid");

const previsionPagos = async (data) => {
  let { initial_date, _id, client, price, quotas } = data;
  const total = price / quotas;

  for (let i = 0; i < quotas; i++) {
    const dates = moment(initial_date).add(i, "M");
    console.log(dates,'Dates');

    await new PrevisionPago({
      quoteNumber: i + 1,
      date: dates,
      total,
      expediente: _id,
      client,
    }).save();
  }
};


const reprevisionPagos = async (data,newDate) => {


   const initial_date = moment(newDate,'DD-MM-YYYY')


  data.forEach(async(previsionPago,i) => {
    const dates = moment(initial_date).add(i, "M");

    const {quoteNumber,_id,date,total,...rest} = previsionPago
   

    await PrevisionPago.findByIdAndUpdate(_id,{
        date:dates,
        ...rest
    })


  });

}

module.exports = { previsionPagos,reprevisionPagos };
