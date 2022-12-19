const Call = require("../../models/Call");
const moment = require("moment-timezone");
const Agente = require("../../models/Agente");

const createHistoryCallServices = async (req) => {
 
  if (req.body.event === "NOTIFY_START") {
    const { event, pbx_call_id, caller_id } = req.body;

    const data = {
      id_call: pbx_call_id,
      caller_id: caller_id,
      history: {
        event,
        date: moment().toDate(),
      },
    };

    new Call(data).save();
  }
  if (req.body.event === "NOTIFY_ANSWER") {
    const { event, pbx_call_id, extension } = req.body;

    const agente = await Agente.findOne({ extension });

    const data = {
      history: {
       event,
        date: moment().toDate(),
      },
    };

    await Call.findOneAndUpdate(
      { id_call: pbx_call_id },
      { agente: agente._id, $push: data }
    );
  }
  if (req.body.event === "NOTIFY_END") {
    const { event, pbx_call_id, disposition,duration } = req.body;

    const data = {
      history: {
      event,
        date: moment().toDate(),
      },
    };

    await Call.findOneAndUpdate(
      { id_call: pbx_call_id },
      { status:disposition,duration,$push: data },
      { new: true }
    );
  }
};

const createNotifyAnswerServices = async (req) => {
  //  event – evento (NOTIFY_ANSWER)
  // caller_id – número del llamante;
  // destination – número al que se realiza la llamada;
  // call_start – hora del inicio de la llamada;
  // pbx_call_id – id de la llamada;
  // internal – (opcional) extensión.
  //  event – evento (NOTIFY_END)
  // call_start – hora del inicio de la llamada;
  // pbx_call_id – id de la llamada;
  // caller_id – número del llamante;
  // called_did – número al que se realiza la llamada;
  // internal – (opcional) extensión;
  // duration – duración en segundos;
  // disposition – estado de la llamada:
  // 'answered' – conversación,
  // 'busy' – ocupado,
  // 'cancel' - cancelado,
  // 'no answer' - sin respuesta,
  // 'failed' - no ha sido posible,
  // 'no money' - no hay saldo, se ha superado el límite,
  // 'unallocated number' - el número no existe,
  // 'no limit' - se ha superado el límite,
  // 'no day limit' - se ha superado el límite diario,
  // 'line limit' - se ha superado el límite de líneas,
  // 'no money, no limit' - se ha superado el límite;
  // last_internal – extensión, último partícipe de la llamada (después de la transferencia o recogida de llamada);
  // status_code – código del estado de la llamada Q.931;
  // is_recorded – 1 - hay grabación de la llamada, 0 - no hay grabación;
  // call_id_with_rec – id de la llamada con grabación (recomendamos cargar el archivo de la grabación no antes de 40 segundos puesto que se requiere tiempo para guardar el archivo).
};
module.exports = {
  createHistoryCallServices,
  createNotifyAnswerServices,
};
