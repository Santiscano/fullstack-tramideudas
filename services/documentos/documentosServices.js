const Documento = require("../../models/Documento");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const createDocumentosServices = async (req) => {

 let documentos, uploadPath, data, document;
 const {name,category} = req.body
  //TODO:SEGMENTAR EL CODIGO?

  console.log(req.body);

  if (!req.files || Object.keys(req.files).length === 0)
    throw new Error("No enviaste ningun Documento");

  documentos = req.files.documentos;

  if (!documentos) throw new Error("No enviaste ningun documento");

  if (Object.keys(req.files).length >= 2)
    throw new Error("Envia solo un documento");

if (!name || !category) throw new Error('Debes enviar el nombre y categoria del documento')
  
const existFile = await Documento.findOne({ md5: documentos.md5 });

  // Quito la extension del nombre y creo otro name para guardarlo
  // const nameFile = documentos.name.substr(0, documentos.name.lastIndexOf("."));
  const extension = documentos.name.split(".").at(-1);
  const newName = uuidv4();

  if (existFile) {
    data = {
      name: name,
      type: extension,
      category,
      path_local: existFile.path_local,
      id_amazon: existFile.id_amazon,
      md5: existFile.md5,
      url_local: existFile.url_local,
    };

    document = new Documento(data);
  } else {
    uploadPath = path.join(__dirname, "../../uploads/", newName);
    //subo los archivos al path
    documentos.mv(uploadPath, (err) => {
      if (err) return console.log(err);

    });

    //TODO: AMAZON
    data = {
      name,
      type: extension,
      category,
      path_local: uploadPath,
      id_amazon: "pendiente",
      md5: documentos.md5,
    };

    document = new Documento(data);
  }

  await document.save();

  const id = document._id.toString();
  //creo la url con el id
  const fullUrl = req.headers.host + req.originalUrl + id;

  await document.updateOne({ url_local: fullUrl });

  // return document._id;
  return fullUrl;
};

const downloadDocumentosServices = async (req) => {
  const { id } = req.params;

  const documento = await Documento.findById({ _id: id });
  const name = documento.name.replace(/\./g, '_').replace(/\//g, '_')
  
  const filename = `${name}.${documento.type}`;

  const data = {
    pathfile: documento.path_local,
    filename,
  };

  return data;
};
module.exports = {
  createDocumentosServices,
  downloadDocumentosServices,
};
