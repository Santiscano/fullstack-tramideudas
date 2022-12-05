const moment = require("moment");
require("moment-timezone");
const _ = require("lodash");
const Client = require("../../models/Client");
const HistoryChange = require("../../models/HistoryChange");
const { default: mongoose } = require("mongoose");

moment.tz.setDefault("Europe/Madrid");
const { isEqual, uniq } = _;

const createClientServices = async (body) => {
  let data;
  let telephone = [];
  let {
    name,
    surnames,
    identity_document,
    telephone_number,
    email,
    address,
    advertising_allowed,
  } = body;

  if (!name || !surnames || !telephone_number)
    throw new Error("Debes enviar nombre,apellido y un telefono");

  if (!advertising_allowed) advertising_allowed = false;

  if (telephone_number) {
    telephone_number.forEach((number, idx) => {
      const main = idx === 0;
      let objNumbers = { number, main };
      telephone.push(objNumbers);
    });
  }

  if (address) {
    if (
      !address.type_via ||
      !address.name_via ||
      !address.number_via ||
      !address.postal_code ||
      !address.province ||
      !address.municipality
    ) {
      throw new Error(
        "Tipo via, nombre via y número via, provincia, codigo postal y municipio son requeridos"
      );
    }

    data = {
      name,
      surnames,
      identity_document,
      telephone,
      email,
      advertising_allowed,
      address: { ...address },
      createdAt: moment().toDate(),
    };
  } else {
    data = {
      name,
      surnames,
      identity_document,
      telephone,
      email,
      advertising_allowed,
    };
  }

  return await new Client(data).save();
};

const getAllClientServices = async (req) => {
  let { limit = 30, page = 0 } = req.params;
  limit = parseInt(limit);
  page = parseInt(page);

  const search = Object.keys(req.query);
  let query = {};

  search.forEach((key) => {
    if (mongoose.isValidObjectId(req.query[key])) {
      query[key] = req.query[key];
    } else {
      query[key] = { $regex: req.query[key], $options: "i" };
    }
  });

  const clients = await Client.find(query)
    .skip(page * limit)
    .limit(limit)
    .lean();

  const count = await Client.countDocuments(query);

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: clients,
  };

  return data;
};
const updateClientServices = async (req) => {
  const agente = req.userId;
  const { id } = req.params;
  const body = req.body;

  const client = await Client.findOne({ _id: id });

  if (!client) throw new Error("Ese cliente no esta disponible");

  const data = {
    ...body,
    modifiedAt: moment().toDate(),
  };

  let newData = await Client.findByIdAndUpdate({ _id: client.id }, data, {
    new: true,
  });

  // TODO:mover a utils getupdatekeys
  const getUpdatedKeys = (oldData, newData) => {
    const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
    const keys = [];
    for (const key of data) {
      if (key === "modifiedAt") continue;
      if (!isEqual(oldData[key], newData[key])) {
        keys.push({ [key]: { newData: newData[key], oldData: oldData[key] } });
      }
    }
    return keys;
  };
  let changes = getUpdatedKeys(client.toObject(), newData.toObject());

  dataHistory = {
    agente,
    changes,
    client: client._id,
    date: moment().toDate(),
  };

  new HistoryChange(dataHistory).save();

  return 'Cliente actualizado'
};

const readClientServices = async (params) => {
  const { id } = params;

  const client = await Client.findById(id);

  if (!client) throw new Error('no existe ese cliente')

  return client;
};
const deleteClientServices = async (params) => {
  const { id } = params;

  return await Client.findByIdAndUpdate(
    { _id: id },
    { deleted: true },
    { new: true }
  );
};
module.exports = {
  createClientServices,
  readClientServices,
  updateClientServices,
  getAllClientServices,
  deleteClientServices,
};
