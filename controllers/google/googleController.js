const {
    authenticateGoogleGmailServices,
    saveTokenGoogleServices,
    sendGmailServices
} = require("../../services/google/googleServices");

const authenticateGoogleGmailController = async (req, res) => {
  try {
    const data = await authenticateGoogleGmailServices(req.body);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const saveTokenGoogleController = async (req, res) => {
  try {
    const data = await saveTokenGoogleServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const sendGmailController = async (req, res) => {
  try {
    const data = await sendGmailServices(req.params, req.body);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
    authenticateGoogleGmailController,
    saveTokenGoogleController,
    sendGmailController
};
