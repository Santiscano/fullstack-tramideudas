const moment = require('moment-timezone')
const mongoose = require("mongoose");
const Client = require("../../models/Client");
const Agente = require("../../models/Agente");
const NoteClient = require("../../models/NoteClient");
const createNoteClientsServices = async (req) => {
  const agentID = req.userId;
  const { cliente, note } = req.body;

  console.log(cliente, note, agentID);

  if (!cliente)
    throw new Error("Debes especificar para que cliente es la nota");
  if (!note) throw new Error("Debes enviar una nota");

  const clienteDB = await Client.findOne({ _id: cliente });
  const agentDB = await Agente.findOne({ _id: agentID });

  if (!clienteDB) throw new Error("ese cliente no se encuentra");

  const data = {
    agente: agentDB._id,
    note,
    client: clienteDB._id,
    createdAt: moment().toDate()
  };
  new NoteClient(data).save();

  return "Nota creada con exito";
};

const getAllNoteClientsServices = async (req) => {
  let { limit = 30, page = 0 } = req.params;
  limit = parseInt(limit);
  page = parseInt(page);

  const search = Object.keys(req.query);
  let query = {};

  search.forEach((key) => {
    if (key !== "note") {
      console.log(key);

      if (mongoose.isValidObjectId(req.query[key])) {
        query[key] = req.query[key];
      } else {
        query[key] = { $regex: req.query[key], $options: "i" };
      }
    }
  });

  const notes = await NoteClient.find(query)
    .skip(page * limit)
    .limit(limit)
    .sort({createdAt:-1})
    .lean();

  const count = await NoteClient.countDocuments(query);

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: notes,
  };

  return data;
};

const readNoteClientsServices = async (params) => {

  const { id } = params;

  const noteDB = await NoteClient.findOne({ _id: id });
  if (!id) throw new Error("debes enviar el id de la nota");
  if (!noteDB) throw new Error("no existe esa nota");

  return noteDB;
};

module.exports = {
  createNoteClientsServices,
  getAllNoteClientsServices,
  readNoteClientsServices,
};
