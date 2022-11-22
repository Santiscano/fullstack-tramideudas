const {
  createDocumentosServices,
  downloadDocumentosServices,
  downloadDocumentosAmazonServices,
} = require("../../services/documentos/documentosServices");

const createDocumentosController = async (req, res) => {
  try {
    const data = await createDocumentosServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: error.message });
  }
};
const  downloadDocumentosAmazonController = async (req, res) => {
 try {
    const { pathFile, filename } = await downloadDocumentosAmazonServices(req);
    res.status(200).download(pathFile, filename, function (err) {
      if (err) {
        res
          .status(err.status)
          .json({ errorMessage: "No se encontro el archivo" });
      } else {
        // decrement a download credit, etc.
      }
    });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const downloadDocumentosController = async (req = request, res) => {
  try {
    const { pathfile, filename } = await downloadDocumentosServices(req);
    res.status(200).download(pathfile, filename, function (err) {
      if (err) {
        res
          .status(err.status)
          .json({ errorMessage: "No se encontro el archivo" });
      } else {
        // decrement a download credit, etc.
      }
    });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createDocumentosController,
  downloadDocumentosController,
  downloadDocumentosAmazonController,
};
