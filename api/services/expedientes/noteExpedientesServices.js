const moment = require('moment-timezone');
const NoteExpediente = require("../../models/NoteExpediente");

const createNoteExpedientestServices = async (req) => {
  let { expediente, client, note } = req.body;
  const { agent } = req.userId;

  if (!client || !expediente || !note)
    throw new Error("Debes enviar el cliente, expediente y la nota");

  await new NoteExpediente({ agent, client, expediente, note,createdAt: moment().toDate()}).save();

  return "Creado";
};

const getAllNoteExpedientestServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const nota = await NoteExpediente.find()
    .skip(page * limit)
    .limit(limit)
    .sort({createdAt:-1});

  const count = await NoteExpediente.countDocuments();

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: nota,
  };

  return data;
};
const readNoteExpedientestServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del nota");

  const data = await NoteExpediente.findOne({ _id: id }).lean();

  if (!data) throw new Error("No existe esa nota");

  return data;
};

module.exports = {
  createNoteExpedientestServices,
  getAllNoteExpedientestServices,
  readNoteExpedientestServices,
};
