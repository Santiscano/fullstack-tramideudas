const { Schema, model } = require("mongoose");
const CallSchema = Schema(
  {
    id_call: {
      type: String,
    },
    caller_id: {
      type: String,
    },
    agente: {
      type: Schema.Types.ObjectId,
      ref: "Agente",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    status: {
      type: String,
      enum: ["answered", "busy", "cancel", "no answer", "failed"],
    },
    duration: {
      type: String,
    },
    history: [
      {
        event: {
          type: String,
          enum: ["NOTIFY_START", "NOTIFY_ANSWER", "NOTIFY_END"],
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { versionKey: false }
);
const Call = model("Call", CallSchema);
module.exports = Call;
