const { Schema, model } = require("mongoose");

const PaymentSchema = Schema(
  {
    expediente: {
      // expediente
      type: Schema.Types.ObjectId,
      ref: "Expediente",
    },
    type: {
      // tipo de pago
      type: String,
      enum: ["honorario", "tasas", "gastos","reembolso"],
    },
    method: {
      // metodo de pago
      type: String,
      enum: ["transferencia", "stripe", "efectivo", "bizum", "paypal", "otros"],
    },
    note: {
      // nota
      type: String,
    },
    amount: {
      // monto
      type: Number,
    },
    receipt: {
      // comprobante
      type: Schema.Types.ObjectId,
      ref: "Documento",
    },
    invoiced: {
      // facturado
      type: Boolean,
    },
    date: {
      // fecha
      type: Date,
    },
  },
  { versionKey: false }
);

const Payment = model("Payment", PaymentSchema);
module.exports = Payment;
