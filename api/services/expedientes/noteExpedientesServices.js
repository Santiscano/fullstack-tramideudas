const NoteExpediente = require("../../models/NoteExpediente");

const createNoteExpedientestServices = async (req) => {
  let { expediente, client, note } = req.body;
  const { agent } = req.userId;

  if (!client || !expediente || !note)
    throw new Error("Debes enviar el cliente, expediente y la nota");

  await new NoteExpediente({ agent, client, expediente, note }).save();

  return "Creado";
};

const getAllNoteExpedientestServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const nota = await NoteExpediente.find()
    .skip(page * limit)
    .limit(limit);

  const count = await NoteExpediente.countDocuments();

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: nota,
  };

  return data;
};
const updateNoteExpedientestServices = async (req) => {
  const {id} = req.params

  const note = await NoteExpediente.findByIdAndUpdate({_id:id},{...req.body},{new:true});

  console.log(note);
 return note
};
const readNoteExpedientestServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del nota");

  const data = await NoteExpediente.findOne({ _id: id }).lean();

  if (!data) throw new Error("No existe esa nota");

  return data;
};

const deleteNoteExpedientestServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del nota");

  const data = await NoteExpediente.findByIdAndRemove(
    { _id: id },
    { new: true }
  ).lean();

  if (!data) throw new Error("Esa nota no se encuentra");

  return data;
};
module.exports = {
  createNoteExpedientestServices,
  getAllNoteExpedientestServices,
  updateNoteExpedientestServices,
  readNoteExpedientestServices,
  deleteNoteExpedientestServices,
};