const Documento = require("../../models/Documento");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const createDocumentosServices = async (req) => {
  let documentos;
  let uploadPath;

  //TODO:VALIDAR QUE EL ARCHIVO NO EXISTA Y SI ENVIAN MUCHOS ARCHIVOS

  if (!req.files || Object.keys(req.files).length === 0)
  throw new Error("No enviaste ningun Documento");
  
  documentos = req.files.documentos;
  
  if (!documentos) throw new Error("No enviaste ningun documento");
  
  // Quito la extension del nombre y creo otro name para guardarlo
  const nameFile = documentos.name.split(".").at(0);
  const extension = documentos.name.split(".").at(-1);
  const newName = uuidv4();
  
  //TODO:SEPARAR EL CODIGO

  uploadPath = path.join(__dirname, "../../uploads/", newName);
  //subo los archivos al path
  documentos.mv(uploadPath, (err) => {
    if (err) throw new Error(err);

    console.log('Archivo se encuentra en la ruta',uploadPath);
  });

  //TODO: AMAZON
  const data = {
    name: nameFile,
    type: extension,
    path_local: uploadPath,
    id_amazon: "pendiente",
    md5: documentos.md5,
  };

  const document = await new Documento(data).save();

  const id = document._id.toString();
  //creo la url con el id
  const fullUrl = req.headers.host + req.originalUrl + id;

  await document.updateOne({ url_local: fullUrl });

  return document._id;
};

const downloadDocumentosServices = async (req) => {
    const {id} = req.params

    const documento = await Documento.findById({_id:id})

    const filename = `${documento.name}.${documento.type}`
    console.log(filename);

    const data = {
      pathfile:documento.path_local,
      filename,
    }

    
    return data

};
module.exports = {
  createDocumentosServices,
  downloadDocumentosServices,
};
