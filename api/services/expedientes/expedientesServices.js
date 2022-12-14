const moment = require("moment-timezone");
const Expediente = require("../../models/Expediente");
const Product = require("../../models/Product");
const { previsionPagos } = require("./previsionPagos");

const { uploadDocument } = require("../../utils/uploadDocument");

moment.tz.setDefault("Europe/Madrid");

const regexInteger = new RegExp(/^([+-]?[1-9]\d*|0)$/);
  let documento;
const createExpedienteServices = async (req) => {
  let {
    fractioned,
    quotas,
    product,
    price,
    client,
    initial_date,
    unsigned_contract,
    signed_contract,
    unsigned_authorizations,
    signed_authorizations,
  } = req.body;


  if (req.files) {
    const files = req.files

    if (files.documentos){ 

    if (files.documentos.length > 0) {

       documento = await  Promise.all(files.documentos.map(async(file,idx) => {
        const dataFile = {
              name: `expediente-file-${idx}-${moment().format("DD-MM-YYYY")}`,
              category:'expedientes'
               }

          return await uploadDocument(req,file,dataFile)
               
      }))
    }else{

      const dataFile = {
        name: `expediente-${moment().format("DD-MM-YYYY")}`,
        category:'expedientes'
         }

      documento = await uploadDocument(req,files,dataFile)
    }
  }
  }

  fractioned = fractioned === 'true' 
  price = parseFloat(price)
  quotas = parseInt(quotas)

console.log(fractioned);
  if (!client) throw new Error("Debes enviar el cliente");

  const productDB = await Product.findOne({ _id: product });

  if (!productDB) throw new Error("ese producto no existe o no se encuentra");

  if (productDB.isBankable === true) {
    if (fractioned) {
      if (!quotas) throw new Error("Envia las cuotas");
      const result = regexInteger.test(quotas);
      if (!result) throw new Error("quotas debe ser un entero");
    }
    fractioned =
      fractioned !== true ? { fractioned: false } : { fractioned, quotas };
  } 

  const initial = moment(initial_date,"DD/MM/YYYY").format()
 
  const data = {
    client,
    product: productDB._id,
    price:  price ? price : price = productDB.price,
    ...fractioned,
    date: moment().toDate(),
    initial_date: initial,
    unsigned_contract,
    signed_contract,
    unsigned_authorizations,
    signed_authorizations,
    documento: documento && documento 
  };

  const newExpediente = await new Expediente(data).save();

  if (newExpediente.fractioned === true) {
    previsionPagos(newExpediente);
  }
documento = undefined;
  return data;
};

const getAllExpedienteServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const expediente = await Expediente.find()
    .skip(page * limit)
    .limit(limit);

  const count = await Expediente.countDocuments();

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: expediente,
  };

  return data;
};

const updateExpedienteServices = async (req) => {
  let documento;
  const {id} = req.params
  let producto;
  const {product,paymentStatus,price} = req.body
  
  const expediente = await Expediente.findOne({_id:id})
  if (product) {  
    producto = await Product.findOne({_id:product})
    if(producto) throw new Error('No existe ese producto')
  }
  if (req.files) {
    const files = req.files

    if (files.documentos){ 

    if (files.documentos.length > 0) {

       documento = await  Promise.all(files.documentos.map(async(file,idx) => {
        const dataFile = {
              name: `expediente-file-${idx}-${moment().format("DD-MM-YYYY")}`,
              category:'expedientes'
               }

          return await uploadDocument(req,file,dataFile)
               
      }))
    }else{

      const dataFile = {
        name: `expediente-${moment().format("DD-MM-YYYY")}`,
        category:'expedientes'
         }

      documento = await uploadDocument(req,files,dataFile)
    }
  }
  }
  
  const data = {
    product: !producto ? expediente._id : product._id,
    price: !price ? expediente.price : price, 
    paymentStatus: !paymentStatus ? expediente.paymentStatus : paymentStatus,
    documento: documento && documento 
  }

  if(!expediente) throw new Error('El expediente que enviaste no existe')

  await Expediente.findByIdAndUpdate({_id:expediente._id},data)


};
const readExpedienteServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const data = await Expediente.findOne({ _id: id }).lean();

  if (!data) throw new Error("No existe ese expendiente");

  return data;
};

const deleteExpedienteServices = async (req) => {
  const { id } = req.params;

  if (!id) throw new Error("Envia el id del expediente");

  const data = await Expediente.findByIdAndRemove(
    { _id: id },
    { new: true }
  ).lean();

  if (!data) throw new Error("Ese expediente no se encuentra");

  return data;
};
module.exports = {
  createExpedienteServices,
  getAllExpedienteServices,
  updateExpedienteServices,
  readExpedienteServices,
  deleteExpedienteServices,
};
