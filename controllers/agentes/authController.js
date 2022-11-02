const authServices = require('../../services/agentes/authServices')
const authLoginController = async (req, res) => {
    try {
      const data = await authServices(req.body);
      return res.status(200).json(data);
      
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error.message);
    }
   
  };

  module.exports = authLoginController;