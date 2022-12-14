const path = require("path");
const { v4: uuidv4 } = require("uuid");

const Documento = require("../models/Documento");
const {
  uploadFile,
  getFileAndUrl,
} = require("../services/documentos/amazonS3");
const uploadDocument = async (req, file, fileData) => {
  let documentos, uploadPath, data, document;

  const { name, category } = fileData;

  if (!file || Object.keys(file).length === 0)
    throw new Error("No enviaste ningun Documento");

  documentos = file.documentos;

  if (!documentos) throw new Error("No enviaste ningun documento");

  if (Object.keys(file).length >= 2) throw new Error("Envia solo un documento");

  if (!name || !category)
    throw new Error("Debes enviar el nombre y categoria del documento");

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
    uploadPath = path.join(__dirname, "../uploads/", newName);
    //subo los archivos al path
    documentos.mv(uploadPath, (err) => {
      if (err) return console.log(err);
    });

    data = {
      name,
      type: extension,
      category,
      path_local: uploadPath,
      md5: documentos.md5,
    };

    document = new Documento(data);
  }

  await document.save();

  if (!document.id_amazon) {
    const key = document._id.toString();
    const result = await uploadFile(document.path_local, key);
    if (result) {
      await document.updateOne({ id_amazon: document._id });
    }
  }

  const id = document._id.toString();
  //creo la url con el id
  const fullUrl = req.headers.host + "/api/documento/" + id;

  await document.updateOne({ url_local: fullUrl });

  // return document._id;

  return document._id;
};

module.exports = {
  uploadDocument,
};
