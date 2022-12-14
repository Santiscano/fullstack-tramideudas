const {
    createPaymentsServices,
    updatePaymentsServices,
    readPaymentsServices
  } = require("../../services/payments/paymentsServices");
  
  const createPaymentsController = async (req, res) => {
    try {
      const data = await createPaymentsServices(req);
      return res.status(201).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  const updatePaymentsController = async (req, res) => {
    try {
      const data = await updatePaymentsServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  const readPaymentsController = async (req, res) => {
    try {
      const data = await readPaymentsServices(req);
      return res.status(200).json({ response: data });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  module.exports = {
    createPaymentsController,
    updatePaymentsController,
    readPaymentsController
  };