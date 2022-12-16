const Role = require("../../models/Role");
const Ruta = require("../../models/Ruta");

const createRutaServices = async (body) => {
  const { ruta, get, post, put } = body;

  const rutaExist = await Ruta.findOne({ ruta: ruta });

  if (rutaExist) throw new Error("La ruta debe ser unica");
  if (!ruta) throw new Error("Debes enviar la ruta");
  if (!get || !post || !put || !body.delete) {
    throw new Error("Debes enviar todos los metodos(GET,POST,PUT,DELETE)");
  }

  const data = {
    ruta,
    GET: get,
    POST: post,
    PUT: put,
    DELETE: body.delete,
  };

  return await new Ruta(data).save();
};

const getAllRutaServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const rutas = await Ruta.find()
    .skip(page * limit)
    .limit(limit);

  const count = await Ruta.countDocuments();

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: rutas,
  };

  return data;
};

const updateRutaServices = async (params, body) => {
  const { id } = params;
  const { ruta, get, post, put } = body;

  const rutaExist = await Ruta.findOne({ ruta: ruta });

  if (rutaExist) throw new Error("La ruta debe ser unica");
  if (!ruta) throw new Error("Debes enviar la ruta");
  if (!get || !post || !put || !body.delete) {
    throw new Error("Debes enviar todos los metodos(GET,POST,PUT,DELETE)");
  }

  if (!id) throw new Error("revisa el parametro");

  const data = {
    ruta,
    GET: get,
    POST: post,
    PUT: put,
    DELETE: body.delete,
  };

  const newRuta = await Ruta.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
 if (!newRuta) throw new Error('Esa ruta no existe')

  return newRuta;
};

const readRutaServices = async (params) => {
  const { id } = params;

  const ruta = await Ruta.findById(id);

  if (!ruta) throw new Error('La ruta no existe')

  return ruta;
};
const deleteRutaServices = async (params) => {
  const { id } = params;

  const ruta = await Ruta.findByIdAndDelete({ _id: id });

  if (!ruta) throw new Error('No existe esa ruta')
};
module.exports = {
  createRutaServices,
  readRutaServices,
  updateRutaServices,
  getAllRutaServices,
  deleteRutaServices,
};
