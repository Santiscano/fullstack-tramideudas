const moment = require("moment-timezone");
const Payment = require("../../models/Payment");
const Expediente = require("../../models/Expediente");
const { uploadDocument } = require("../../utils/uploadDocument");
const { method } = require("lodash");

const createPaymentsServices = async (req) => {

  let { expediente, amount, type, method, note, date } = req.body;
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

  if (!expedienteExist) throw new Error('Ese expediente no existe');

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
    const total = restPrice - amount
    
    if (restPrice < amount) throw new Error(`El monto es mayor al precio restante: ${restPrice}`);
    if (total === 0 ) await expedienteExist.updateOne({ paymentStatus: "Pagado" });
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

const getAllPaymentstServices = async (req) => {};

const updatePaymentsServices = async (req) => {
  
  const {id} = req.params
  let {amount,type,note,date,method,invoiced} = req.body
  let documento;

  const payment = await Payment.findOne({_id:id})

  if (payment.invoiced === true) throw new Error('Este pago ya esta facturado y no puede ser editado')

  date = !date ? moment().toDate() : moment(date, "DD/MM/YYYY").format();
  method ? method : payment.method;

  if (req.files) {
    const file = req.files
    const dataFile = {
      name: `comprobante-${method}-${moment(date).format("DD-MM-YYYY")}`,
      category:'comprobantes'
       }
  documento = await uploadDocument(req,file,dataFile)
  }

  if (type === 'reembolso') {
    amount = -amount
  }

  const data = {
    amount: amount ? amount : payment.amount,
    type: type ? type : payment.type,
    note: note ? note : payment.note,
    date,
    method,
   receipt: documento && documento,
    invoiced: invoiced === 'true'
  }
  
  return await Payment.findByIdAndUpdate({_id:payment._id},data,{new:true})

};

const readPaymentsServices = async (req) => {
        const {id} = req.params

    const payment = await Payment.findOne({_id:id})

    if(!payment) throw new Error('Ese pago no existe')

        return payment

};

module.exports = {
  createPaymentsServices,
  readPaymentsServices,
  updatePaymentsServices
};
