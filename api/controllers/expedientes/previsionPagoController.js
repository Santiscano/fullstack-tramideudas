const {
     updatePrevisionPagosServices,
     updateOnePrevisionPagosServices,
     readPrevisionPagosServices,
  } = require("../../services/expedientes/previsionPagosServices");
   
  const updatePrevisionPagoController = async (req, res) => {
    try {
      const data = await updatePrevisionPagosServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const updateOnePrevisionPagoController = async (req, res) => {
    try {
      const data = await updateOnePrevisionPagosServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const readPrevisionPagoController = async (req, res) => {
    try {
      const data = await readPrevisionPagosServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  
  module.exports = {
    updatePrevisionPagoController,
    updateOnePrevisionPagoController,
    readPrevisionPagoController,
  };