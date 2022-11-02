const Role = require("../../models/roles/Role");
const Ruta = require("../../models/rutas/Ruta");



const createRutaServices = async (body) => {
  const { ruta,get,post,put} = body;



  const data = {
    ruta,
    GET: get,
    POST: post,
    PUT: put,
    DELETE: body.delete
  }



  return await new Ruta(data).save();



};

const getAllRutaServices = async () => {
   return await Ruta.find();
};

const updateRutaServices = async (params, body) => {
  const { id } = params;
  let { } = body;

  console.log(id);
   if(!id) throw new Error("revisa el parametro")


 
   const { ruta,get,post,put} = body;



   const data = {
     ruta,
     GET: get,
     POST: post,
     PUT: put,
     DELETE: body.delete
   }

  

//   if (rutaValid) throw new Error("La ruta debe ser unica");



  const newRuta = await Ruta.findByIdAndUpdate({ _id: id },data, {
    new: true,
  });

  return newRuta;
};

const readRutaServices = async (params) => {
  const { id } = params;

  const ruta = await Ruta.findById(id)
                                    

                               
  return ruta;
};
const deleteRutaServices = async (params) => {
  const { id } = params;

  return await Ruta.findByIdAndDelete({ _id: id });
};
module.exports = {
  createRutaServices,
  readRutaServices,
  updateRutaServices,
  getAllRutaServices,
  deleteRutaServices,
};