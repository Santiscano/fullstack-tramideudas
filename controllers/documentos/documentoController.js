const {
    createDocumentosServices,
    downloadDocumentosServices
  } = require("../../services/documentos/documentosServices");
  
  const createDocumentosController = async (req, res) => {
    try {
      const data = await createDocumentosServices(req);
      return res.status(201).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const downloadDocumentosController = async (req, res) => {
    try {
      const {pathfile,filename} = await downloadDocumentosServices(req);
      // return res.status(201).json({ response:'ok' });

      res.status(200).download(pathfile, filename, function (err) {
        if (err) {
            console.log(err);
        } else {
          // decrement a download credit, etc.
        }
      })
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
 
  
  module.exports = {
  createDocumentosController,
  downloadDocumentosController
  };