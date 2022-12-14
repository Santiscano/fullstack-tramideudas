const moment = require("moment-timezone");
const Payment = require("../../models/Payment");
const Expediente = require("../../models/Expediente");
const { uploadDocument } = require("../../utils/uploadDocument");

const createPaymentsServices = async (req) => {

    //TODO: TIENE QUE PODER SUBIRSE DOCUMENTOS (CREAR EN UTILS PARA REUTILIZAR)
  let { expediente, amount, type, method, note, receipt, date } = req.body;
  let data,
    documento,
    payments = 0;
    
   date = !date ? moment().toDate() : moment(date, "DD/MM/YYYY").format();

    if (req.files) {
      const file = req.files
      const dataFile = {
        name: `comprobante-${method}-${moment(date).format("DD-MM-YYYY")}`,
        category:'comprobantes'
         }

      
    documento = await uploadDocument(req,file,dataFile)


    }

  const expedienteExist = await Expediente.findOne({ _id: expediente });

  if (amount > expedienteExist.price)
    throw new Error("El pago actual sobrepasa el precio del expediente");

  if (!note) throw new Error("Debes enviar una nota para el pago");

  // si es honorario

  if (type === "honorario") {

    if (expedienteExist.paymentStatus === "Pagado") throw new Error("Este expediente ya esta pago");

    if (amount === expedienteExist.price) await expedienteExist.updateOne({ paymentStatus: "Pagado" });

    const totalPayments = await Payment.find({
      expediente: expedienteExist._id,
    }).where({ type: "honorario" });

    totalPayments.forEach((payment) => (payments += payment.amount));

    const restPrice = expedienteExist.price - payments;

    // TODO: validar si completo el pago se cambie el status del expendiente a "Pagado"
    console.log(restPrice);
    if (restPrice <= 0) await expedienteExist.updateOne({ paymentStatus: "Pagado" });

    if (restPrice < amount) throw new Error(`El monto es mayor al precio restante: ${restPrice}`);
  }

  if (type === 'reembolso') {
   amount = -amount
  }

  data = {
    expediente: expedienteExist._id,
    amount,
    type,
    method,
    note,
    date,
    receipt: documento && documento
  };


  return await new Payment(data).save();

};

const getAllNoteExpedientestServices = async (req) => {};

const readPaymentsServices = async (req) => {
        const {id} = req.params

    const payment = await Payment.findOne({_id:id})

        return payment

};

module.exports = {
  createPaymentsServices,
  readPaymentsServices
};
